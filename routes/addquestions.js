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
    let questionTitle = req.body['title'];
    let questionBody = req.body['body'];
    let courseID = req.body['course'];
    let topicID = req.body['topic'];
    let difficultyID = req.body['difficulty'];
    let typeID = req.body['type'];
    if (questionTitle && questionBody && courseID && topicID && difficultyID && typeID) {
        let params = [questionTitle, questionBody, courseID, topicID, difficultyID, typeID];
        db.none("INSERT INTO Questions(QuestionTitle, QuestionBody, CourseID, TopicID, DifficultyID, TypeID)" +
            "VALUES ($1, $2, $3, $4, $5, $6)", params)
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
