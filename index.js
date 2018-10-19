// Including config file
const config = require("./config.json");
const express = require("express");
const app = express();
const kafka = require("kafka-node");
const port = config.application.port || 3000;

// Kafka stuffs
var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;

// Creating a new Kafka client
var client = new Client(config.kafka.host, config.kafka.clientId, {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

// Handling Kafka client errors; it will be displayed only on the standard error output.
client.on("error", function (error) {
    console.error(error);
});

var consumer = new HighLevelConsumer(
    client,
    [
        {
            topic: "node-test"
        }
    ],
    {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: "buffer"
    }
);

consumer.on("message", function (message) {
    var decodedMessage = type.fromBuffer(
        new Buffer(message.value, 'binary').slice(0)
    );
    console.log(decodedMessage);
});

consumer.on("error", function (error) {
    console.log("error", error);
});

process.on("SIGINT", function () {
    consumer.close(true, function () {
        process.exit();
    });
});

// Serving static data from templates directory
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.send("Na mizu");
});

app.listen(port, function () {
    console.log("App listening on port " + port + "...");
});
