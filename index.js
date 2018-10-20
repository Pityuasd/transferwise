const config = require("./config.json");
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = config.application.port || 3000;

// Requiring models
const assign = require("./models/assignhelper");
const EventModel = require("./models/event");

mongoose.connect(config.mongo.host, function (error) {
    error && console.log("Mongo connection error: " + error);
});

// Serving static data from templates directory
app.use(express.static("public"));
// For parsing application/json requests
app.use(bodyParser.json());

app.post("/events", function (request, response) {
    var event = assign(new EventModel(), request.body);
    event.save();
    response.send(event);
});

app.listen(port, function () {
    console.log("App listening on port " + port + "...");
});
