const express = require('express');

const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.get("/", (req, res) => {
    db.manyOrNone('SELECT * FROM Courses')
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                mode: "course",
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

router.post("/", (req, res) => {
    res.type("application/json");
    //Retrieve data from query params
    var coursename = req.body['coursename'];
    if(coursename) {
        db.manyOrNone("SELECT * FROM Courses WHERE coursename LIKE" + " '%" + coursename +"%'")
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
    }else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required user information"
        });
    }
});

module.exports = router;