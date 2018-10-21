const mongoose = require("mongoose");
const MetricModel = require("./metric");

// Composing the schema attributes and their types
const schema = mongoose.Schema({
    _id: {
        type: String
    },
    src_currency: {
        type: String
    },
    tgt_currency: {
        type: String
    },
    profile_id: {
        type: Number
    },
    id: {
        type: Number
    },
    source_amount: {
        type: Number
    },
    recipient_id: {
        type: Number
    },
    submit_time: {
        type: String
    },
    src_country: {
        type: String
    },
    tar_country: {
        type: String
    }
});

// Creating model from the schema
const model = mongoose.model("Transfer", schema);

schema.post("save", function (document) {
    var identifier = document.properties || {};
    identifier["date"] = new Date().toISOString().substr(0, 10);

    var metric = "values.transfer";
    var operator = {"$inc": {}};
    operator["$inc"][metric] = 1;
    MetricModel.update(
        {"_id": identifier},
        operator,
        {upsert: true},
        function (err) {
            err && console.log(err);
        }
    );
});

// Exporting the created model for the external usages
module.exports = model;
