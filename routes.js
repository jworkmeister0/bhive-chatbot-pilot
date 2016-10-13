/* jshint node: true, devel: true */
"use strict";
module.exports = function (app, GLOBALS){

	var onMessageEvent = require("./messagingEventHandler");

	app.get("/", function(req, res){
		res.send("hello there!");
	});

	app.get("/webhook", function(req, res){
		if (req.query["hub.mode"] === "subscribe" && 
			req.query["hub.verify_token"] === GLOBALS.validationToken){

				console.log("validating webhook");
				res.status(200).send(req.query["hub.challenge"]);
			} else{
				console.log("failed validation. validation tokens don't match");
				res.sendStatus(403);
			}
	});

	app.post("/webhook", function(req, res){
		var data = req.body;
		if(data.object === "page"){
			data.entry.forEach( function(pageEntry) {
				var pageID = pageEntry.id;
				var timeOfEvent = pageEntry.time;

				pageEntry.messaging.forEach(function (messagingEvent){
					if (messagingEvent.optin) {
						onMessageEvent.onMessage(messagingEvent);

					} else if (messagingEvent.message) {
						receivedMessage(messagingEvent);
					} else if (messagingEvent.delivery) {
						receivedDeliveryConfirmation(messagingEvent);
					} else if (messagingEvent.postback) {
						receivedPostback(messagingEvent);
					} else if (messagingEvent.read) {
						receivedMessageRead(messagingEvent);
					} else if (messagingEvent.account_linking) {
						receivedAccountLink(messagingEvent);
					} else {
						console.log("Webhook received unknown messagingEvent: ", messagingEvent);
					}
				});

			});
		}
	});

	app.get("/authorize", function(req, res){
		var accountLinkingtoken = req.query.account_linking_token;
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
