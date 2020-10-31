require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./dbConnection");

//Express app instance called app

//middleware
app.use(cors());
app.use(express.json());
const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get("/api/:table/search", async (req, res) => {
    console.log("search api called!!");
    try {
        //TODO: replace with logging library
        let { searchCriteria, queryText } = req.query;
        const queryResults = await db.query(
            `SELECT * FROM ${req.params.table} WHERE ${searchCriteria}=$1`,
            [queryText]
        );
        console.log(JSON.stringify(queryResults.rows));
        res.json(queryResults.rows);
    } catch (err) {
        res.json(err);
    }
});

app.post("/api/rentbooks", async (req, res) => {
    console.log("rentbooks api called!!");
    try {
        let { cust_id, book_copies } = req.body;
        //don't need to validate cust_id is correct and book copy ids are correct because of foreign key constraint
        //validating as if backend can be called from postman and needs to be able to maintain the consistency of the database

        //remove duplicates from list of book copy ids in array book_copies to be issued
        book_copies = [...new Set(book_copies)];
        cust_id = parseInt(cust_id);
        let inClauseArg = "(";
        for (let i = 0; i < book_copies.length; i++) {
            inClauseArg += parseInt(book_copies[i]); //for security against sql injection
            if (i === book_copies.length - 1) inClauseArg += ")";
            else inClauseArg += ", ";
        }
        console.log(inClauseArg);

        //santized inClauseArg through parseInt
        const dbRes = await db.query(
            `SELECT book_copy_id,book_copy_status FROM book_copies where book_copy_id IN ${inClauseArg}`
        );

        let alreadyIssued = false;
        let firstErrorBookCopyId = 0;
        dbRes.rows.forEach((bookCopy) => {
            if (bookCopy.book_copy_staus === 0) {
                alreadyIssued = true;
                firstErrorBookCopyId = bookCopy.book_copy_id;
            }
        });
        if (alreadyIssued) {
            res.status(400).json({
                errorMessage: `${firstErrorBookCopyId} has already been issued. No transaction has been performed. Rectify payload and try again`,
            });
            return;
        }

        let queryPromiseArray = [];
        //fire all the queries to the db at once
        for (let i = 0; i < book_copies.length; i++) {
            let queryPromise = db.query(
                "INSERT INTO transactions(trans_cust_id,trans_book_copy_id,issue_date,trans_status) VALUES($1,$2,$3,$4)",
                [cust_id, book_copies[i], getTodaysDate(), 1]
            );
            //trans_id will be auto allotted
            //return date would be null
            //charges would be null
            //we are giving
            queryPromiseArray.push(queryPromise);
        }
        let queryResults = await Promise.all(queryPromiseArray);
        console.log(JSON.stringify(queryResults));
        res.json({
            successMessage: `Given book_copies have been issued to ${cust_id}`,
        });
    } catch (err) {
        res.json(err);
    }
});
/**
 * to get today's date in the format of DATE datatype of Postrgres
 */
function getTodaysDate() {
    let today = new Date();
    return (
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        today.getDate().toString().padStart(2, "0")
    );
}
//command to run nodemon -w server
