'use strict';

// NPM Modules
var bodyParser = require("body-parser");
var crypto  = require("crypto");
var express = require("express");
var hbs     = require("hbs");
var https   = require("https");
var request = require("request");



// Configure Express
var app = express();
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 5000);

//app.use(bodyParser.json({ 
//    verify: require("./verifyRequestSignature")(crypto)
//}));

//var routes = require("./routes")(app);

app.get("/", function(req, res){
    res.status(200).send("hello there!!!");
});

app.listen(process.env.PORT || '8080', function(){
    console.log("Running on port", app.get("port"));
});
