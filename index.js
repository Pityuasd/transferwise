// Including config file
var TransferSchema = {
    name: "Transfer",
    type: "record",
    fields: [
        {
            name: "id",
            type: "string"
        },
        {
            name: "src_currency",
            type: "string"
        },
        {
            name: "profile_id",
            type: "string"
        },
        {
            name: "tgt_currency",
            type: "string"
        },
        {
            name: "source_amount",
            type: "string"
        },
        {
            name: "recipient_id",
            type: "string"
        },
        {
            name: "submit_time",
            type: "double"
        }
    ]
};

var avsc = require('avsc');
var TransferSchemaType = avsc.parse(TransferSchema);

const config = require("./config.json");
const express = require("express");
const app = express();
const kafka = require("kafka-node");
const port = config.application.port || 3000;

// Kafka stuffs
var HighLevelConsumer = kafka.HighLevelConsumer;
var HighLevelProducer = kafka.HighLevelProducer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;

// Creating a new Kafka client
var client = new Client(config.kafka.host, config.kafka.clientId, {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

// Handling Kafka client errors; it will be displayed only on the standard error output.
client.on("error", function (error) {
    console.log(error);
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

app.get("/post", function (request, response) {
    var producer = new HighLevelProducer(client);

    producer.on("ready", function () {
        // Create message and encode to Avro buffer
        var messageBuffer = TransferSchemaType.toBuffer({
                id: "1",
                src_currency: "EUR",
                profile_id: "978",
                tgt_currency: "RUB",
                source_amount: "58412",
                recipient_id: "879",
                submit_time: Date.now(),
            });

        // Create a new payload
        var payload = [{
            topic: 'node-test',
            messages: messageBuffer,
            attributes: 1
        }];

        //Send payload to Kafka and log result/error
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error(error);
            } else {
                var formattedResult = result[0];
                console.log('result: ', result)
            }
        });
    });

    producer.on("error", function (error) {
        console.error(error);
    });

    response.send("sent");
});

app.listen(port, function () {
    console.log("App listening on port " + port + "...");
});
