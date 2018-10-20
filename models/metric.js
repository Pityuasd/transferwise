const mongoose = require("mongoose");

// Composing the schema attributes and their types
const schema = mongoose.Schema({
    _id: {
        type: Map,
        of: String
    },
    values: {
        type: Map,
        of: Number
    }
});

// Creating model from the schema
const model = mongoose.model("Metric", schema);

// Exporting the created model for the external usages
module.exports = model;
