const mongoose = require("mongoose");

// Composing the schema attributes and their types
const schema = mongoose.Schema({
    _id: {
        type: String,
    },
    abbreviation: {
        type: String
    },
    currency: {
        type: String
    }
});

// Creating model from the schema
const model = mongoose.model("CountryCurrency", schema);

// Exporting the created model for the external usages
module.exports = model;