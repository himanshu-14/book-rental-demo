require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./dbConnection");
const { getTodaysDateString, createInClauseArg } = require("./utils");
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
        cust_id = parseInt(cust_id); //for security against sql injection
        book_copies = book_copies.map((bookCopy) => parseInt(bookCopy));
        book_copies = [...new Set(book_copies)];
        //remove duplicates from list of book copy ids in array book_copies to be issued
        let inClauseArg = createInClauseArg(book_copies);
        console.log(inClauseArg);

        //check if any of the books has been issued already
        //TODO: need to check parameterized query supports array for IN clause??
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
                errorMessage: `${firstErrorBookCopyId} has already been issued. No transaction has been performed. Rectify payload and try again`
            });
            return;
        }
        //if all the books are available for issuing
        let queryPromiseArray = [];
        //fire all the queries to the db at once
        for (let i = 0; i < book_copies.length; i++) {
            let transactionAdded = db.query(
                "INSERT INTO transactions(trans_cust_id,trans_book_copy_id,issue_date,trans_status) VALUES ($1,$2,$3,$4)",
                [cust_id, book_copies[i], getTodaysDateString(), 1]
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
            successMessage: `Given book_copies have been issued to ${cust_id}`
        });
    } catch (err) {
        res.json(err);
    }
});

app.post("/api/returnBooks", async (req, res) => {
    console.log("test debugger");
    console.log("returnBooks api called!!");
    try {
        let { book_copies } = req.body;
        let bookCopyReturnedPromiseArray = [];
        //fire all the queries to the db at once
        for (let i = 0; i < book_copies.length; i++) {
            let bookCopyId = book_copies[i];
            bookCopyReturnedPromiseArray.push(
                findChargesAndUpdateTables(bookCopyId)
            );

            //trans_id will be auto allotted
            //return date would be null
            //charges would be null
            //we are giving
        }
        let allTransactions = await Promise.all(bookCopyReturnedPromiseArray); //wait till all the transactions are completed
        console.log(JSON.stringify(allTransactions));
        let totalCharges = allTransactions.reduce(
            (total, trans) => total + parseFloat(trans.charges),
            0
        );
        res.json({
            successMessage: `Given book_copies have been returned`,
            allTransactions,
            totalCharges: totalCharges / 100 //in paisa
        });
    } catch (err) {
        res.json(err);
    }
});

async function findChargesAndUpdateTables(bookCopyId) {
    let bookCopyTableUpdated = db.query(
        "UPDATE book_copies SET book_copy_status=1 where book_copy_id = $1",
        [bookCopyId]
    );
    let {
        rows
    } = await db.query(
        "SELECT * FROM transactions WHERE trans_book_copy_id=$1 AND trans_status=1",
        [bookCopyId]
    );
    let trans = rows[0];
    let returnDateString = getTodaysDateString();
    console.log(JSON.stringify(trans.issue_date));
    let days = parseInt(
        (new Date(returnDateString) - trans.issue_date) / 86400000
    );

    let charges = days * 100; //stored in paisa
    let customerTableUpdated = db.query(
        "UPDATE customers SET num_rented=num_rented-1 where cust_id = $1",
        [trans.trans_cust_id]
    );
    let transactionTableUpdateResults = await db.query(
        "UPDATE transactions SET trans_status=0 ,return_date=$1,charges=$2 WHERE trans_book_copy_id=$3 AND trans_status=1 RETURNING *",
        [returnDateString, charges, bookCopyId]
    );
    await customerTableUpdated;
    await bookCopyTableUpdated;
    //need to wait for these promises to be resolved before resolving overall findChargesAndUpdateTables promise
    return transactionTableUpdateResults.rows[0];
}

//command to run nodemon -w server
//or npm start
