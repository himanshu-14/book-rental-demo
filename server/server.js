require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./dbConnection");
const { getTodaysDate, createInClauseArg } = require("./utils");

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
        cust_id = parseInt(cust_id); //for security against sql injection
        book_copies = [...new Set(book_copies)];
        //remove duplicates from list of book copy ids in array book_copies to be issued
        let inClauseArg = createInClauseArg(book_copies);
        console.log(inClauseArg);

        //check if any of the books has been issued already
        const dbRes = await db.query(
            `SELECT book_copy_id,book_copy_status FROM book_copies where book_copy_id IN ${inClauseArg}`
        );

        let alreadyIssued = false;
        let firstErrorBookCopyId = 0;
        for (let i = 0; i < dbRes.rows.length; i++) {
            let bookCopy = dbRes.rows[i];
            if (bookCopy.book_copy_status === 0) {
                alreadyIssued = true;
                firstErrorBookCopyId = bookCopy.book_copy_id;
                break;
            }
        }
        if (alreadyIssued) {
            res.status(400).json({
                errorMessage: `${firstErrorBookCopyId} has already been issued. No transaction has been performed. Rectify payload and try again`,
            });
            return;
        }
        //if all the books are available for issuing
        let queryPromiseArray = [];
        //fire all the queries to the db at once
        for (let i = 0; i < book_copies.length; i++) {
            let transactionAdded = db.query(
                "INSERT INTO transactions(trans_cust_id,trans_book_copy_id,issue_date,trans_status) VALUES ($1,$2,$3,$4)",
                [cust_id, book_copies[i], getTodaysDate(), 1]
            );
            let bookCopyTableUpdated = db.query(
                "UPDATE book_copies SET book_copy_status=0 where book_copy_id = $1",
                [book_copies[i]]
            );
            let customerTableUpdated = db.query(
                "UPDATE customers SET num_rented=num_rented+1 where cust_id = $1",
                [cust_id]
            );
            //trans_id will be auto allotted
            //return date would be null
            //charges would be null
            //we are giving
            queryPromiseArray.push(
                transactionAdded,
                bookCopyTableUpdated,
                customerTableUpdated
            );
        }
        let queryResults = await Promise.all(queryPromiseArray); //wait till all the transactions are completed
        console.log(JSON.stringify(queryResults));
        res.json({
            successMessage: `Given book_copies have been issued to ${cust_id}`,
        });
    } catch (err) {
        res.json(err);
    }
});

//command to run nodemon -w server
//or npm start
