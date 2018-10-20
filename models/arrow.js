const mongoose = require("mongoose");

// Composing the schema attributes and their types
const schema = mongoose.Schema({
    _id: {
        type: String
    },
    startingCountry: {
        type: String
    },
    targetCountry: {
        type: String
    }
});

// Creating model from the schema
const model = mongoose.model("Arrow", schema);

// Exporting the created model for the external usages
module.exports = model;
