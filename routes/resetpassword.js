//express is the framework we're going to use to handle requests
const express = require('express');

//We use this create the SHA256 hash
const crypto = require("crypto");

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let getHash = require('../utilities/utils').getHash;

let generateRandomPassword = require('../utilities/utils').generateRandomPassword;

let sendEmail = require('../utilities/utils').sendEmail;

let router = express.Router();

// Define activity mode and pass back to caller
let mode = 'reset';

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post('/', (req, res) => {
    res.type("application/json");
    //Retrieve data from query params
    let email = req.body['email'];
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(email) {
        db.one("SELECT COUNT(*) FROM Members WHERE Email = '" + email + "'")
            //If successful, run function passed into .then()
            .then(row => {
                if(row['count'] == 0) {
                    res.send({
                        success: false,
                        error: "Email does not exist"
                    });
                } else {
                    let salt = crypto.randomBytes(32).toString("hex");
                    let newPassword = generateRandomPassword(10);
                    let salted_hash = getHash(newPassword, salt);
                    let params = [salted_hash, salt, email];
                    db.none("UPDATE Members SET Password = $1, Salt = $2 WHERE Email = $3", params)
                        .then(() => {
                            //We successfully added the user, let the user know
                            res.send({
                                success: true,
                                mode: mode
                            });
                            sendEmail(email, "Welcome!", "Your new password: " + newPassword);
                        }).catch((err) => {
                            //log the error
                            //console.log(err);
                            //If we get an error, it most likely means the account already exists
                            //Therefore, let the requester know they tried to create an account that already exists
                            res.send({
                                success: false,
                                error: err
                            });
                        });
                }
            }).catch((error) => {
                //console.log(error);
                res.send({
                    success:false,
                    error:error
                })
        });
    } else {
        res.send({
            success: false,
            error: "Missing required user information"
        });
    }
});

module.exports = router;