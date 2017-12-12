Coding challenge for Massdrop 

Create a job queue whose workers fetch data from a URL and store the results in a database.
 The job queue should expose a REST API for adding jobs and checking their status / results.

 Example:

 User submits www.google.com to your endpoint. The user gets back a job id.
 Your system fetches www.google.com (the result of which would be HTML) and stores the result.
 The user asks for the status of the job id and if the job is complete, he gets a response that
 includes the HTML for www.google.com.

For this, I created a barebones UI using React and backend with a job queue and REST API using Kue, Node, Express, and MongoDB. Responses are given to the user using window alerts on the webpage, but feel free to test directly using Postman.

To run (Assuming everything is installed):
  1. Navigate to database directory and type : mongod
  2. Navigate to server folder and type : node app.js
  3. Type npm start in root directory
  
Known issues:
  1. Cannot retrieve some webpages because payload is too large
  2. Newest job will not finish until another job is input. This may be because I'm using a callback function when the job is saved.
