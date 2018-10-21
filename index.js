const config = require("./config.json");
const port = config.application.port || 3000;
const mongoose = require('mongoose');
const mongooseRepl = require('mongoose');
const db = mongoose.connection;
const dbRepl = mongooseRepl.connection;
const bodyParser = require('body-parser');
const express = require('express');
var uuid = require('uuid');
var app = express();
var server = app.listen(3000);

var io = require('socket.io').listen(server);
// Requiring models
const assign = require("./models/assignhelper");
const EventModel = require("./models/event");
const ArrowModel = require("./models/arrow");
const MetricModel = require("./models/metric");

// To work around "MongoError: cannot open $changeStream for non-existent
// database: test" for this example
mongoose.connection.createCollection('metrics');
mongoose.connection.createCollection('transfers');
mongoose.connection.createCollection('profiles');

mongoose.connect(config.mongo.host, function (error) {
    error && console.log("Mongo connection error: " + error);
});

mongooseRepl.connect(config.mongo.host + "?replicaSet=rs", function (error, client) {
    console.log("connection.");
    error && console.log("Mongo connection error: " + error);
});

dbRepl.once('open', () => {
    // Create watcher for the original data
    const transfersCollection = dbRepl.collection('transfers');
    const transfersChangeStream = transfersCollection.watch();

    transfersChangeStream.on('change', (change) => {
        if (change['operationType'] === 'insert') {
            var transfer = change['fullDocument'];
            // Declare special rules for the data we need on the counters
            var arrow = new ArrowModel();
            arrow['_id'] = uuid.v1();
            arrow['startingCountry'] = transfer['src_country'];
            arrow['targetCountry'] = transfer['tar_country'];
            arrow.save();
        }
    });

    // Create watcher for the original data
    const profilesCollection = dbRepl.collection('profiles');
    const profilesChangeStream = profilesCollection.watch();

    profilesChangeStream.on('change', (change) => {
        if (change['operationType'] === 'insert') {
            // Declare special rules for the data we need on the counters
        }
    });
});

// Serving static data from templates directory
app.use(require("express").static("public"));
// For parsing application/json requests
app.use(bodyParser.json());

io.on('connection', function (socket) {
    console.log('a user connected');
        const metricsCollection = dbRepl.collection('metrics');
        const metricsChangeStream = metricsCollection.watch();

        metricsChangeStream.on('change', (change) => {
            // Declare special rules for the data we need on the counters
            if (change['operationType'] === 'update') {
                // socket.emit("metric", change['fullDocument']);
                console.log(change);
            }
        });

        const arrowsCollection = dbRepl.collection('arrows');
        const arrowsChangeStream = arrowsCollection.watch();

        arrowsChangeStream.on('change', (change) => {
            // Declare special rules for the data we need on the counters
            if (change['operationType'] === 'insert') {
                socket.emit("arrows", change['fullDocument']);
            }
        });
});

app.post("/events", function (request, response) {
    var event = assign(new EventModel(), request.body);
    event.save();
    response.send(event);
});

app.get("/country", function (request, response) {
    var countryCode = request.param("code");
    MetricModel.findOne({"_id.country": countryCode}, function (err, metric) {
        if (err) return console.error(err);
        if(metric) {
            response.send(metric);
        } else {
            var mockMetric = {
                _id: {
                    "type": "ALL_TIME_COUNTRY",
                    "country": countryCode
                },
                "customers": 150,
                "transactions": 139,
                "moneyTransfered": 156948
            }
            response.send(mockMetric);
        }
    });
});