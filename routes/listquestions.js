const express = require('express');

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let router = express.Router();

const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.get("/", (req, res) => {
    let dbquery = 'SELECT * FROM Questions '
    if (!(req.query['title'] == null))
        dbquery += 'WHERE QuestionTitle = \'' +
            req.query['title'] + '\'';
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