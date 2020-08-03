const express = require('express');

let db = require('../utilities/utils').db;

let router = express.Router();

const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.get("/", (req, res) => {
    if (req.query['qid'] == null) {
        res.send({
            success: false,
            error: "'qid' must be passed to answer GET query"
        });
        return;
    }
    let dbquery = 'SELECT AnswerID, AnswerText FROM Answers WHERE QuestionID = ' +
        req.query['qid'];
    db.manyOrNone(dbquery)
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                answers: data
            });
        }).catch((error) => {
        //console.log(error);
        res.send({
            success: false,
            error: error
        })
    });
});

module.exports = router;