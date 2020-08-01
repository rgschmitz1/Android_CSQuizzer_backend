// express is the framework we're going to use to handle requests
const express = require('express');

// We use this to create the SHA256 hash
const crypto = require('crypto');

// Create connection to Heroku Database
let db = require('../utilities/utils').db;

let getHash = require('../utilities/utils').getHash;

let sendEmail = require('../utilities/utils').sendEmail;
const sender = 'phucbob.csquizzer@gmail.com';

let router = express.Router();

const bodyParser = require('body-parser');
// This allows parsing of the body of the POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post('/', (req, res) => {
    res.type('application/json');

    // Retrieve data from query params
    let first = req.body['first'];
    let last = req.body['last'];
    let username = req.body['username'];
    let email = req.body['email'];
    let password = req.body['password'];
    // Verify that the caller supplied all the parameters
    // In js, empty strings or null values evaluate to false
    if(first && last && username && email && password) {
        // We're storing salted hashes to make our application more secure
        let salt = crypto.randomBytes(32).toString('hex');
        let salted_hash = getHash(password, salt);

        // Use .none() since no result gets returned from an INSERT in SQL
        // We're using placeholders ($1, $2, $3) in the SQL query string to
        // avoid SQL injection
        let params = [first, last, username, email, salted_hash, salt];
        db.none('INSERT INTO Members(FirstName, LastName, Username, Email, Password, Salt) ' +
            'VALUES ($1, $2, $3, $4, $5, $6)', params)
            .then(() => {
                // We successfully added the user
                res.send({
                    success: true
                });
                sendEmail(sender, email, 'Welcome!',
                    "<strong>Welcome to our app!</strong>");
            }).catch((err) => {
            //log teh error
            console.log(err);
            // If we get an error, it most likely means the account already exists
            // Therefore, let the requester known they tried to create an account that already exists
            res.send({
                success: false,
                error: err
            });
        });
    } else {
        res.send({
            success: false,
            input: req.body,
            error: 'Missing required user information'
        });
    }
});

module.exports = router;