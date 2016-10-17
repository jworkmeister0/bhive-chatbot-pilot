"use strict";
// jshint unused: false
// Defining how to handle messaging events when recieved
module.exports = (function(){

  var sender = require("./sendThings");

  var APP_SECRET = process.env.APP_SECRET;

  var messagingEventHandler = {

    onMessage: function(event){
      var senderID      = event.sender.id;
      var recipientID   = event.recipient.id;
      var timeOfMessage = event.timestamp;
      var message       = event.message;

      console.log("Received message for user %d and page %d at %d with message:", 
        senderID, recipientID, timeOfMessage);
      console.log(JSON.stringify(message));

      var isEcho = message.is_echo;
      var messageID = message.mid;
      var appID = message.app_id;
      var metadata = message.metadata;


      // We may get a text or attachment but not both
      var messageText = message.text;
      var messageAttachments = message.attachments;
      var quickReply = message.quick_reply;

      if (isEcho){
        console.log("Recieved echo for message %s and app %d with metatdata %s",
          messageID, appID, metadata);
        return;
      } else if (quickReply){
        var quickReplyPayload = quickReply.payload;
        console.log("Quick reply for message %s with payload %s",
          messageID, quickReplyPayload);

        sender.sendTextMessage(senderID, "Quick reply tapped");
      }

      if (messageText) {
        switch (messageText) {
          case "image":
            sender.sendImageMessage(senderID);
            break;

          case "gif":
            sender.sendGifMessage(senderID);
            break;

          case "audio":
            sender.sendAudioMessage(senderID);
            break;

          case "video":
            sender.sendVideoMessage(senderID);
            break;

          case "file":
            sender.sendFileMessage(senderID);
            break;

          case "button":
            sender.sendButtonMessage(senderID);
            break;

          case "generic":
            sender.sendGenericMessage(senderID);
            break;

          case "quick reply":
            sender.sendQuickReply(senderID);
            break;

          case "typing on":
            sender.sendTypingOn(senderID);
            break;

          case "typing off":
            sender.sendTypingOff(senderID);
            break;

          case "account linking":
            sender.sendAccountLinking(senderID);
            break;

          default:
            sender.sendTextMessage(senderID, messageText);
        }

      } else if (messageAttachments){
        sender.sendTextMessage(senderID, "Message with attachment recieved");
      }
    },

    onDeliveryConfirmation: function(event){
      var senderID       = event.sender.id;
      var recipientID    = event.recipient.id;
      var delivery       = event.delivery;

      var messageIDs     = delivery.mids;
      var watermark      = delivery.watermark;
      var sequenceNumber = delivery.seq;

      if (messageIDs){
        messageIDs.forEach( function(messageID) {
          console.log("Received delivery confirmation for message ID: %s", messageID);
        });
      }
      console.log("All message before %d were delivered.", watermark);
    },

    onPostback: function(event){
      var senderID       = event.sender.id;
      var recipientID    = event.recipient.id;
      var timeOfPostback = event.timestamp;

      // The "payload" param is a developer-defined field which is set in a postback 
      // button for Structured Messages. 
      var payload = event.postback.payload;

      console.log("Received postback for user %d and page %d with payload '%s' " + 
        "at %d", senderID, recipientID, payload, timeOfPostback);

      // When a postback is called, we'll send a message back to the sender to 
      // let them know it was successful
      sender.sendTextMessage(senderID, "Postback called");
    },

    onMessageRead: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;

      // All messages before watermark (a timestamp) or sequence have been seen.
      var watermark = event.read.watermark;
      var sequenceNumber = event.read.seq;

      console.log("Received message read event for watermark %d and sequence " +
        "number %d", watermark, sequenceNumber);
    },

    onAccountLinking: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;

      var status = event.account_linking.status;
      var authCode = event.account_linking.authorization_code;

      console.log("Received account link event with for user %d with status %s " +
        "and auth code %s ", senderID, status, authCode);
    }
  };

  return messagingEventHandler;
}());
