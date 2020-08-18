const express = require('express');

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let router = express.Router();

const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.get("/", (req, res) => {
    let dbquery = 'SELECT * FROM Questions WHERE TopicId = ' + '\'' + req.query['topicid'] + '\'';
    db.manyOrNone(dbquery)
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                mode: "question",
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

module.exports = router;