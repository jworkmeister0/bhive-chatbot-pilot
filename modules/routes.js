"use strict";
module.exports = function (app){

	var globals = require("./globals");
	var messageHandler = require("./messagingEventHandler");

	var VALIDATION_TOKEN = globals.getValidationToken();

	app.get("/", function(req, res){
		res.send("hello there!");
	});

	app.get("/test", function(req, res){
		var token = globals.getMeta();
		res.send("I got your test: " + token);
	});

	app.get("/webhook", function(req, res){
		if (req.query["hub.mode"] === "subscribe" && 
			req.query["hub.verify_token"] === VALIDATION_TOKEN){

				console.log("validating webhook");
				res.status(200).send(req.query["hub.challenge"]);
			} else{
				console.log("failed validation. validation tokens don't match");
				res.sendStatus(403);
			}
	});

	app.post("/webhook", function(req, res){
		var data = req.body;

		console.log(data);

		if(data.object === "page"){
			data.entry.forEach(function(pageEntry) {

				// jshint ignore: start
				var pageID = pageEntry.id;
			  var timeOfEvent = pageEntry.time;
				// jshint ignore: end

				pageEntry.messaging.forEach(function (messagingEvent){
					if (messagingEvent.optin) {
						messageHandler.onMessage(messagingEvent);

					} else if (messagingEvent.message) {
						messageHandler.onMessage(messagingEvent);

					} else if (messagingEvent.delivery) {
						messageHandler.onDeliveryConfirmation(messagingEvent);

					} else if (messagingEvent.postback) {
						messageHandler.onPostback(messagingEvent);

					} else if (messagingEvent.read) {
						messageHandler.onMessageRead(messagingEvent);

					} else if (messagingEvent.account_linking) {
						messageHandler.onAccountLicking(messagingEvent);

					} else {
						console.log("Webhook received unknown messagingEvent: ", messagingEvent);
					}
				});

			});
		}
	});

	app.get("/authorize", function(req, res){
		var accountLinkingToken = req.query.account_linking_token;
		var redirectURI = req.query.redirect_uri;

		var authCode = "1234567890";

		var redirectURISuccess = redirectURI + "&authorization_code=" + authCode;

		res.render("authorize",{
			accountLinkingToken: accountLinkingToken,
			redirectURI: redirectURI,
			redirectURISuccess: redirectURISuccess
		});
	});
};
