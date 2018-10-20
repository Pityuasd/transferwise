const config = require("./config.json");
const port = config.application.port || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// Requiring models
const assign = require("./models/assignhelper");
const EventModel = require("./models/event");

mongoose.connect(config.mongo.host, function (error) {
    error && console.log("Mongo connection error: " + error);
});

// Serving static data from templates directory
app.use(require("express").static("public"));
// For parsing application/json requests
app.use(bodyParser.json());

io.on('connection', function (socket) {
    console.log('a user connected');

    setInterval(
        function () {
            socket.emit("test", "value");
        },
        500
    );
});

app.post("/events", function (request, response) {
    var event = assign(new EventModel(), request.body);
    event.save();
    response.send(event);
});
