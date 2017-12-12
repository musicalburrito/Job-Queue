/** Create a job queue whose workers fetch data from a URL and store the results in a database.
 * The job queue should expose a REST API for adding jobs and checking their status / results.

 Example:

 User submits www.google.com to your endpoint. The user gets back a job id.
 Your system fetches www.google.com (the result of which would be HTML) and stores the result.
 The user asks for the status of the job id and if the job is complete, he gets a response that
 includes the HTML for www.google.com.

 **/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/massdrop';
mongoose.connect(url , {
    useMongoClient: true
});

var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes'));

app.listen(port, function() {
    console.log('api running on port ${port}');
});