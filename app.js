"use strict";

// NPM Modules
var bodyParser = require("body-parser");
var express = require("express");
var crypto = require("crypto");
require("./modules/globals.js");


// Configure Express
var app = express();
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json({ 
    verify: verifyRequestSignature
}));

require("./modules/routes")(app);

app.listen(process.env.PORT || "8080", function(){
    console.log("Running on port", process.env.PORT || "8080");
});

function verifyRequestSignature(req, res, buf) {
    var APP_SECRET = process.env.APP_SECRET;
    var signature = req.headers["x-hub-signature"];

    if (!signature) {
        // For testing, let's log an error. In production, you should throw an 
        // error.
        console.error("Couldn't validate the signature.");
    } else {
        var elements = signature.split("=");
        var method = elements[0];
        var signatureHash = elements[1];

        var expectedHash = crypto.createHmac("sha1", APP_SECRET)
            .update(buf)
            .digest("hex");

        if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
        }
    }
}
