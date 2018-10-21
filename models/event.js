const mongoose = require("mongoose");

// Composing the schema attributes and their types
const schema = mongoose.Schema({
    type: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    properties: {
        type: Map,
        of: String
    }
});

// Creating model from the schema
const model = mongoose.model("Event", schema);

// Exporting the created model for the external usages
module.exports = model;
