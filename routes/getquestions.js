const express = require('express');

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let router = express.Router();

const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.get("/", (req, res) => {
    let query = 'SELECT QuestionID, QuestionTitle, QuestionBody, CourseName, ' +
        'TopicDescription, DifficultyDescription, TypeDescription ' +
        'FROM Questions a, Courses b, Topics c, Difficulties d, Types e ' +
        'WHERE a.CourseID = b.CourseID ' +
        'AND a.TopicID = c.TopicID ' +
        'AND a.DifficultyID = d.DifficultyID ' +
        'AND a.TypeID = e.TypeID';
    db.manyOrNone(query)
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                names: data
            });
        }).catch((error) => {
        console.log(error);
        res.send({
            success:false,
            error:error
        })
    });
});

// router.post("/", (req, res) => {
//     res.type("application/json");
//     //Retrieve data from query params
//     var textQuestion = req.body['textQuestion'];
//     if(textQuestion) {
//         db.manyOrNone("SELECT * FROM Questions WHERE TextQuestion LIKE" + " '%" + textQuestion +"%'")
//             //If successful, run function passed into .then()
//             .then((data) => {
//                 res.send({
//                     success: true,
//                     names: data
//                 });
//             }).catch((error) => {
//             console.log(error);
//             res.send({
//                 success:false,
//                 error:error
//             })
//         });
//     }else {
//         res.send({
//             success: false,
//             input: req.body,
//             error: "Missing required user information"
//         });
//     }
// });

module.exports = router;