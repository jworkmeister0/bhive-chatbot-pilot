//jshint unused: false
"use strict";

module.exports = (function(){
	var crypto = require("crypto");
	var globals = require("./globals");

	var APP_SECRET = globals.getAppSecret();

	var verifyRequestSignature = function (req, res, buf){
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

			// TODO: consider changing != to !==
			// jshint ignore: start
			if (signatureHash != expectedHash) {
				throw new Error("Couldn't validate the request signature.");
			}
			//jshint ignore: end
		}
	};

	return verifyRequestSignature;
}());
