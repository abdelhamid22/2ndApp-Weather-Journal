// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
// Require body-parser package
const bodyParser = require('body-parser');
// Require cors package
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server & setup port
const port = 8000;

// Running your server with its port
app.listen(port, listening);

function listening(){
  console.log(`server running...\nrunning on localhost:${port}`);
}

// Get project data from root '/all'
// app.get('/all', (req, res) => {
//   console.log(projectData);
//   res.send(projectData);
// });


// Get project data from root '/getWeatherData'
app.get('/getWeatherData', (req, res) => {
  console.log('getWeatherData: ',data);
  res.send(data[data.length - 1]);
});

// Post data from root '/setWeatherData' 
// and set in projectData object.
app.post('/setWeatherData', setWeatherData);

const data = [];
/** 
 * setWeatherData method
 */
function setWeatherData(req, res){
  // Get new data from request body
  newData = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings
  }

  data.push(newData);
  projectData = data[data.length - 1];
  //console.log('setWeatherData:', projectData);
  res.send(projectData);
}