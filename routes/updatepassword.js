//express is the framework we're going to use to handle requests
const express = require('express');

//We use this create the SHA256 hash
const crypto = require("crypto");

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let getHash = require('../utilities/utils').getHash;

let router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post('/', (req, res) => {
    res.type("application/json");
    //Retrieve data from query params
    let username = req.body['username'];
    let oldPassword = req.body['oldpw'];
    let newPassword = req.body['newpw'];

    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(oldPassword && newPassword && username) {
        db.one('SELECT Password, Salt FROM Members WHERE Username=$1', [username])
            .then(row => {
                let salt = row['salt'];
                //Retrieve our copy of the password
                let ourSaltedHash = row['password'];
                //Combined their password with our salt, then hash
                let theirSaltedHash = getHash(oldPassword, salt);
                //Did our salted hash match their salted hash?
                if (ourSaltedHash === theirSaltedHash) {
                    salt = crypto.randomBytes(32).toString("hex");
                    let salted_hash = getHash(newPassword, salt);
                    let params = [salted_hash, salt, username];
                    db.none("UPDATE Members SET Password = $1, Salt = $2 WHERE Username = $3", params)
                        .then(() => {
                            //We successfully added the user, let the user know
                            res.send({
                                success: true
                            });
                        }).catch((err) => {
                            //log the error
                            console.log(err);
                            //If we get an error, it most likely means the account already exists
                            //Therefore, let the requester know they tried to create an account that already exists
                            res.send({
                                success: false,
                                error: err
                            });
                        });
                } else {
                    //credentials did not match
                    res.send({
                        success: false,
                        error: "Old password does not match"
                    });
                }
            })
            //More than one row shouldn't be found, since table has constraint on it
            .catch((err) => {
                //If anything happened, it wasn't successful
                res.send({
                    success: false,
                    error: "Username does not match",
                    message: err
                });
            });
    } else {
        res.send({
            success: false,
            error: 'missing required fields'
        });
    }
});

module.exports = router;
