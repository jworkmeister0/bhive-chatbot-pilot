"use strict";

module.exports = function(){
  var request = require("request");
  var SERVER_URL = "REPLACE ME!!!!";
  var PAGE_ACCESS_TOKEN = "REPLACE ME!!!!";

  return {
    sendTextMessage: function(recipientId, messageText){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText,
          metadata: "DEVELOPER_DEFINED_METADATA"
        }
      };

      callSendAPI(messageData);
    },
    sendImageMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "image",
            payload: {
              url: SERVER_URL + "/assets/rift.png"
            }
          }
        }
      };

      callSendAPI(messageData);
    },
    sendGifMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "image",
            payload: {
              url: SERVER_URL + "/assets/instagram_logo.gif"
            }
          }
        }
      };

      callSendAPI(messageData);
    },
    sendAudioMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "audio",
            payload: {
              url: SERVER_URL + "/assets/sample.mp3"
            }
          }
        }
      };

      callSendAPI(messageData);
    },
    sendVideoMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "video",
            payload: {
              url: SERVER_URL + "/assets/allofus480.mov"
            }
          }
        }
      };

      callSendAPI(messageData);
    },
    sendFileMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "file",
            payload: {
              url: SERVER_URL + "/assets/test.txt"
            }
          }
        }
      };

      callSendAPI(messageData);
    },
    sendButtonMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: "This is test text",
              buttons:[{
                type: "web_url",
                url: "https://www.oculus.com/en-us/rift/",
                title: "Open Web URL"
              }, {
                type: "postback",
                title: "Trigger Postback",
                payload: "DEVELOPED_DEFINED_PAYLOAD"
              }, {
                type: "phone_number",
                title: "Call Phone Number",
                payload: "+16505551234"
              }]
            }
          }
        }
      };  

      callSendAPI(messageData);
    },
    sendGenericMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [{
                title: "rift",
                subtitle: "Next-generation virtual reality",
                item_url: "https://www.oculus.com/en-us/rift/",               
                image_url: SERVER_URL + "/assets/rift.png",
                buttons: [{
                  type: "web_url",
                  url: "https://www.oculus.com/en-us/rift/",
                  title: "Open Web URL"
                }, {
                  type: "postback",
                  title: "Call Postback",
                  payload: "Payload for first bubble",
                }],
              }, {
                title: "touch",
                subtitle: "Your Hands, Now in VR",
                item_url: "https://www.oculus.com/en-us/touch/",               
                image_url: SERVER_URL + "/assets/touch.png",
                buttons: [{
                  type: "web_url",
                  url: "https://www.oculus.com/en-us/touch/",
                  title: "Open Web URL"
                }, {
                  type: "postback",
                  title: "Call Postback",
                  payload: "Payload for second bubble",
                }]
              }]
            }
          }
        }
      };  

      callSendAPI(messageData);
    },
    sendReceiptMessage: function(recipientId){
      // Generate a random receipt ID as the API requires a unique ID
      var receiptId = "order" + Math.floor(Math.random()*1000);

      var messageData = {
        recipient: {
          id: recipientId
        },
        message:{
          attachment: {
            type: "template",
            payload: {
              template_type: "receipt",
              recipient_name: "Peter Chang",
              order_number: receiptId,
              currency: "USD",
              payment_method: "Visa 1234",        
              timestamp: "1428444852", 
              elements: [{
                title: "Oculus Rift",
                subtitle: "Includes: headset, sensor, remote",
                quantity: 1,
                price: 599.00,
                currency: "USD",
                image_url: SERVER_URL + "/assets/riftsq.png"
              }, {
                title: "Samsung Gear VR",
                subtitle: "Frost White",
                quantity: 1,
                price: 99.99,
                currency: "USD",
                image_url: SERVER_URL + "/assets/gearvrsq.png"
              }],
              address: {
                street_1: "1 Hacker Way",
                street_2: "",
                city: "Menlo Park",
                postal_code: "94025",
                state: "CA",
                country: "US"
              },
              summary: {
                subtotal: 698.99,
                shipping_cost: 20.00,
                total_tax: 57.67,
                total_cost: 626.66
              },
              adjustments: [{
                name: "New Customer Discount",
                amount: -50
              }, {
                name: "$100 Off Coupon",
                amount: -100
              }]
            }
          }
        }
      };

      callSendAPI(messageData);
    },
    sendQuickReply: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "What's your favorite movie genre?",
          metadata: "DEVELOPER_DEFINED_METADATA",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Action",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
            },
            {
              "content_type":"text",
              "title":"Comedy",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
            },
            {
              "content_type":"text",
              "title":"Drama",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
            }
          ]
        }
      };

      callSendAPI(messageData);
    },
    sendReadReceipt: function(recipientId){
      console.log("Sending a read receipt to mark message as seen");

      var messageData = {
        recipient: {
          id: recipientId
        },
        sender_action: "mark_seen"
      };

      callSendAPI(messageData);

    },
    sendTypingOn: function(recipientId){
      console.log("Turning typing indicator on");

      var messageData = {
        recipient: {
          id: recipientId
        },
        sender_action: "typing_on"
      };

      callSendAPI(messageData);
    },
    sendTypingOff: function(recipientId){
      console.log("Turning typing indicator off");

      var messageData = {
        recipient: {
          id: recipientId
        },
        sender_action: "typing_off"
      };

      callSendAPI(messageData);
    },
    sendAccountLinking: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: "Welcome. Link your account.",
              buttons:[{
                type: "account_link",
                url: SERVER_URL + "/authorize"
              }]
            }
          }
        }
      };  

      callSendAPI(messageData);
    },
  };

  function callSendAPI(messageData){
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData

    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        if (messageId) {
          console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
        } else {
          console.log("Successfully called Send API for recipient %s", recipientId);
        }
      } else {
        console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
      }
    });  
  }
};
