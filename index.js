//express is the framework we're going to use to handle requests
const express = require('express');
//Create a new instance of express
const app = express();

//const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
//app.use(bodyParser.json());

//let middleware = require('./utilities/middleware');

/*
 * Include project modules
 */
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/report', require('./routes/report.js'));
app.use('/reset-password', require('./routes/resetpassword.js'));
app.use('/update-password', require('./routes/updatepassword.js'));

app.use('/add-questions', require('./routes/addquestions.js'));
app.use('/add-subquestions', require('./routes/addsubquestions.js'));
app.use('/add-answers', require('./routes/addanswers.js'));
app.use('/add-courses', require('./routes/addcourses.js'));
app.use('/add-topics', require('./routes/addtopics.js'));

app.use('/delete-questions', require('./routes/deletequestions.js'));
app.use('/delete-subquestions', require('./routes/deletesubquestions.js'));
app.use('/delete-answers', require('./routes/deleteanswers.js'));
app.use('/delete-courses', require('./routes/deletecourses.js'));
app.use('/delete-topics', require('./routes/deletetopics.js'));

app.use('/update-questions', require('./routes/updatequestions.js'));
app.use('/update-question-type', require('./routes/updatequestiontype.js'));
app.use('/update-subquestions', require('./routes/updatesubquestions.js'));
app.use('/update-answers', require('./routes/updateanswers.js'));
app.use('/update-courses', require('./routes/updatecourses.js'));
app.use('/update-topics', require('./routes/updatetopics.js'));

app.use('/get-questions', require('./routes/getquestions.js'));
app.use('/get-questions-by-topic-id', require('./routes/getquestionsbytopicid.js'));
app.use('/get-questions-by-course-id', require('./routes/getquestionsbycourseid.js'));
app.use('/list-questions', require('./routes/listquestions.js'));
app.use('/get-subquestions', require('./routes/getsubquestions.js'));
app.use('/get-answers', require('./routes/getanswers.js'));
app.use('/get-courses', require('./routes/getcourses.js'));
app.use('/get-topics', require('./routes/gettopics.js'));
app.use('/get-difficulties', require('./routes/getdifficulties.js'));
app.use('/get-types', require('./routes/gettypes.js'));
/*
 * Return HTML for the / end point.
 * This is a nice location to document your web service API
 * Create a web page in HTML/CSS and have this end point return it.
 * Look up the node module 'fs' ex: require('fs');
 */
app.get("/", (req, res) => {
    let fs = require('fs');
    fs.readFile('index.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end(); //end the response
    });
});

/* 
* Heroku will assign a port you can use via the 'PORT' environment variable
* To access an environment variable, use process.env.<ENV>
* If there isn't an environment variable, process.env.PORT will be null (or undefined)
* If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
* In this case, we assign the port to be 5000 if the PORT variable isn't set
* You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
* let port; = process.env.PORT;
* if(port == null) {port = 5000} 
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});