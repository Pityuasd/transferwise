const config = require("./config.json");
const express = require("express");
const app = express();
const port = config.application.port || 3000;

// Serving static data from templates directory
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.send("Na mizu");
});

app.listen(port, function () {
    console.log("App listening on port " + port + "...");
});
