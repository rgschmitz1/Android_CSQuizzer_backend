//pg-promise is a postgres library that uses javascript promises
const pgp = require('pg-promise')();
//We have to set ssl usage to true for Heroku to accept our connection
pgp.pg.defaults.ssl = true;

//Create connection to Heroku Database
let db = pgp(process.env.DATABASE_URL);

if(!db) {
    console.log("Please make sure that postgres is an addon!");
    process.exit(1);
}

module.exports = db;