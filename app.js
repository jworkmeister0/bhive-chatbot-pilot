"use strict";

// NPM Modules
var bodyParser = require("body-parser");
var express = require("express");
require("./modules/globals.js");

// Configure Express
var app = express();
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json({ 
    verify: require("./modules/verifyRequestSignature")
}));

require("./modules/routes")(app);

app.listen(process.env.PORT || "8080", function(){
    console.log("Running on port", process.env.PORT || "8080");
});
