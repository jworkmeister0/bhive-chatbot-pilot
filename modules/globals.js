"use strict";

/**
 * Holds configuration
 */
module.exports = (function () {
    var metadata = require("google-compute-metadata");

    // Private values
    // DON'T HARDCODE ANYTHING HERE!!!!!!
    var GLOBALS = {
        APP_SECRET: "",
        VALIDATION_TOKEN: "",
        PAGE_ACCESS_TOKEN: "this is data",
        SERVER_URL: "asdfasdf"
    };

    metadata.project(function (err, data) {
        GLOBALS.VALIDATION_TOKEN = data.attributes.verify_token;
        process.env.VALIDATION_TOKEN = data.attributes.verify_token;
    });


    // Getters (no setters)
    return {
        getAppSecret: function(){
            return GLOBALS.APP_SECRET;
        },
        getValidationToken: function(){
            return GLOBALS.VALIDATION_TOKEN;
        },
        getPageAccessToken: function(){
            return GLOBALS.PAGE_ACCESS_TOKEN;
        },
        getServerUrl: function(){
            return GLOBALS.SERVER_URL;
        },
        getMeta: function(){
            return GLOBALS.meta;
        }
    };
}());
