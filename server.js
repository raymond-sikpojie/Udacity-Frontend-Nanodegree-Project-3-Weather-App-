// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of express
const app = express();

/* Middleware*/
//onfiguring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

const conditions = [];
// Adding GET route
app.get("/weather", (req, res) => {
  projectData = conditions[0];
  res.send(projectData);
  console.log("response sent");
});

// Adding a POST request
app.post("/", (req, res) => {
  conditions.push(req.body);
  console.log("received a post request");
});

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
