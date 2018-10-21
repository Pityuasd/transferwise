const mongoose = require("mongoose");
const MetricModel = require("./metric");
const assign = require("./assignhelper");

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

// schema.post("save", function (document) {
//     var identifier = document.properties || {};
//     identifier["date"] = new Date().toISOString().substr(0, 10);
//
//     var metric = "values." + document.type;
//     var operator = {"$inc": {}};
//     operator["$inc"][metric] = 1;
//     MetricModel.update(
//         {"_id": identifier},
//         operator,
//         {upsert: true},
//         function (err) {
//             err && console.log(err);
//         }
//     );
// });

// Creating model from the schema
const model = mongoose.model("Event", schema);

// Exporting the created model for the external usages
module.exports = model;
