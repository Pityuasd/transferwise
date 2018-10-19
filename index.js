const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (request, response) {
    response.send("Na mizu");
});

app.listen(port, function () {
    console.log("App listening on port " + port + "...");
});
