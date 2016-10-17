"use strict";
module.exports = function (app){

	var globals = require("./globals");
	var messageHandler = require("./messagingEventHandler");

	app.get("/", function(req, res){
		res.send("hello there!");
	});

	app.get("/test", function(req, res){
		res.send("I got your test: " + process.env.VALIDATION_TOKEN + process.env.PAGE_ACCESS_TOKEN);
	});

	app.get("/webhook", function(req, res){
		console.log("GET at webhook");
		if (req.query["hub.mode"] === "subscribe" && 
			req.query["hub.verify_token"] == process.env.VALIDATION_TOKEN){

				console.log("validating webhook");
				res.status(200).send(req.query["hub.challenge"]);
			} else{
				console.log("failed validation. validation tokens don't match");
				res.sendStatus(403);
			}
	});

	app.post("/webhook", function(req, res){
		console.log("POST at webhook");
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
						console.log("got option event");
						messageHandler.onMessage(messagingEvent);

					} else if (messagingEvent.message) {
						console.log("got message event");
						messageHandler.onMessage(messagingEvent);

					} else if (messagingEvent.delivery) {
						console.log("got delivery event");
						messageHandler.onDeliveryConfirmation(messagingEvent);

					} else if (messagingEvent.postback) {
						console.log("got postback event");
						messageHandler.onPostback(messagingEvent);

					} else if (messagingEvent.read) {
						console.log("got messageRead event");
						messageHandler.onMessageRead(messagingEvent);

					} else if (messagingEvent.account_linking) {
						console.log("got accountLInking event");
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

	app.get("/privacy", function(req, res){
		res.send("some info about privacy goes here!!");
	})
};
