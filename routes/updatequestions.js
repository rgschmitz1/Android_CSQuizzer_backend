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
    //Retrieve data from body params
    let questionID = req.body['question'];
    let courseID = req.body['course'];
    let topicID = req.body['topic'];
    let difficultyID = req.body['difficulty'];
    // let typeID = req.body['type'];
    let questionBody = req.body['body'];
    let questionTitle = req.body['title'];
    if (questionID && courseID && topicID && difficultyID && questionBody && questionTitle) {
        let params = [courseID, topicID, difficultyID, questionBody, questionTitle, questionID];
        db.none("UPDATE Questions " +
            "SET CourseID=$1, TopicID=$2, DifficultyID=$3, QuestionBody=$4, QuestionTitle=$5 " +
            "WHERE QuestionID = $6", params)
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