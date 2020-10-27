require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./dbConnection');

//Express app instance called app

//middleware
app.use(cors());
app.use(express.json());
const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
app.get('/api/:resource/search', async (req, res) => {
    
    try {

        console.log("funny!");
        //TODO: replace with logging library
        let searchCriteria = req.query.by;
        let queryText = req.query.for;
        const queryResults = await db.query(`SELECT * from ${req.params.resource} where ${searchCriteria}=$1`, [queryText]);
        console.log(JSON.stringify(queryResults.rows));
        res.json(queryResults.rows);
    }
    catch (err) {
        res.json(err);
    }


})
//command to run nodemon -w server
