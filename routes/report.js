// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//express is the framework we're going to use to handle requests
const express = require('express');
//create a new instance of express router
var router = express.Router();

let sendEmail = require('../utilities/utils').sendEmail;

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post("/", (req, res) => {
    res.type("application/json");
    //Retrieve data from query params
    let qid = req.body['qid'];
    let title = req.body['title'];
    let message = req.body['message'];
    if(qid && message && title) {
        sendEmail(process.env.PRIMARY_EMAIL, "Report: Question ID: " + qid + ", and Title: " + title, message);
        res.send({
            success: true,
            message: 'Send report question successful!',
        });
    } else {
        res.send({
            success: false,
            error: 'Send report question unsuccessful!'
        });
    }
});
module.exports = router;