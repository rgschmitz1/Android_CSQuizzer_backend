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
    let subQuestionID = req.body['sid'];
    let subQuestionText = req.body['text'];
    if(questionID && subQuestionID && subQuestionText) {
        let params = [questionID, subQuestionID, subQuestionText];
        db.none("INSERT INTO SubQuestions(QuestionID, SubQuestionID, SubQuestionText) VALUES ($1, $2, $3)", params)
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