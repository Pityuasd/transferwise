const mongoose = require("mongoose");

// Composing the schema attributes and their types
const schema = mongoose.Schema({
    _id: {
        type: String,
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    rate: {
        type: Number
    }
});

// Creating model from the schema
const model = mongoose.model("Currency", schema);

// Exporting the created model for the external usages
module.exports = model;