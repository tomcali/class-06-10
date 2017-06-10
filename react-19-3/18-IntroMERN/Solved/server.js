
// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Click schema
var Click = require("./models/click");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));  // default location for static files like css

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
// mongoose.connect("mongodb://admin:codingrocks@ds023674.mlab.com:23674/heroku_5ql1blnl");
// the directory that we put here will be created in the root location for MongoDB
mongoose.connect("mongodb://localhost/class-06-08");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html"); // give this file back
    // all the react app will be placed in index.html
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
// usually it is a client/browser that is making the request
app.get("/api", function(req, res) {   // api route on the server

  // This GET request will search for the latest click count
    // client makes request to server to get the click count
    // and server is making information from MongoDB database and collection
  Click.find({}).exec(function(err, doc) {  // finding information from the collection Click
      // this info includes the click count

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);  // if no error, it sends back the data from the Click collection
    }
  });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
// picking up request sending up the number of clicks to be stored in database
app.post("/api", function(req, res) {

  var clickID = req.body.clickID;
  var clicks = parseInt(req.body.clicks);

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount
  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
  // If included, Mongoose will create a new document matching the description if one is not found
    // document in MongoDB like a row in RDMS
    // if document does not exist... MongoDB will create it
  Click.findOneAndUpdate({  // find document based on parameters... has clickID = clickID
    clickID: clickID
  }, {
    $set: {
      clicks: clicks
    }
  }, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Updated Click Count!");
    }
  });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
