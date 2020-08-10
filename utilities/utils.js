// Get the connection to Heroku Database
let db = require('./sqlconn.js');

// We use this to create the SHA256 hash
const crypto = require('crypto');

// We are using sendgrid for email
const sgMail = require('@sendgrid/mail');
// We need a verified sender to use sendgrid
const sender = process.env.PRIMARY_EMAIL;

function sendEmail(receiver, subj, message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        from: sender,
        to: receiver,
        subject: subj,
        html: message
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent: ' + message);
            }, error => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            }
        });
}

/**
 * Method to get a salted hash.
 * We put this in its own method to keep consistency
 * @param pw the password to hash
 * @param salt the salt to use when hashing
 */
function getHash(pw, salt) {
    return crypto.createHash('sha256').update(pw+salt).digest('hex');
}

function generateRandomPassword(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let i;
    for (i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports = {
    db, getHash, sendEmail, generateRandomPassword
};