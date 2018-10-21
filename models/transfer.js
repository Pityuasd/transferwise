const mongoose = require("mongoose");

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

// Exporting the created model for the external usages
module.exports = model;