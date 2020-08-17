const express = require('express');

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let router = express.Router();

const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.get("/", (req, res) => {
    let dbquery = 'SELECT QuestionID, QuestionTitle, QuestionBody, CourseName, ' +
        'TopicDescription, DifficultyDescription, TypeDescription ' +
        'FROM Questions a, Courses b, Topics c, Difficulties d, Types e ' +
        'WHERE a.CourseID = b.CourseID ' +
        'AND a.TopicID = c.TopicID ' +
        'AND a.DifficultyID = d.DifficultyID ' +
        'AND a.TypeID = e.TypeID';
    if (!(req.query['course'] == null))
        dbquery += ' AND a.CourseID ' +
            'IN (SELECT CourseID FROM Courses WHERE CourseName = \'' +
            req.query['course'] + '\')';
    if (!(req.query['topic'] == null))
        dbquery += ' AND a.TopicID ' +
            'IN (SELECT TopicID FROM Topics WHERE TopicDescription = \'' +
            req.query['topic'] + '\')';
    if (!(req.query['difficulty'] == null))
        dbquery += ' AND a.DifficultyID ' +
            'IN (SELECT DifficultyID FROM Difficulties WHERE DifficultyDescription = \'' +
            req.query['difficulty'] + '\')';
    if (!(req.query['limit'] == null))
        dbquery += ' LIMIT ' + req.query['limit'] + ' ORDER BY QuestionID';
    //console.log(dbquery);
    db.manyOrNone(dbquery)
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                questions: data
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