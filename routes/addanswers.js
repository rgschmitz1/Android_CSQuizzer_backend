//express is the framework we're going to use to handle requests
const express = require('express');

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let router = express.Router();

const bodyParser = require('body-parser');
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post('/', (req, res) => {
    res.type('application/json');
    //Retrieve data from query params
    let questionID = req.body['qid'];
    let answerID = req.body['aid'];
    let textAnswer = req.body['text'];
    if(questionID && answerID && textAnswer) {
        let params = [questionID, answerID, textAnswer];
        db.none("INSERT INTO Answers(QuestionID, AnswerID, AnswerText) VALUES ($1, $2, $3)", params)
            .then(() => {
                //We successfully added the user, let the user know
                res.send({
                    success: true
                });
            }).catch((err) => {
            res.send({
                success: false,
                error: err
            });
        });
    } else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required information"
        });
    }
});

module.exports = router;