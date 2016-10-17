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
        PAGE_ACCESS_TOKEN: "",
        SERVER_URL: ""
    };

    metadata.project(function (err, data) {
        if (data){
            GLOBALS.VALIDATION_TOKEN     = data.attributes.verify_token;
            process.env.VALIDATION_TOKEN = data.attributes.verify_token;

            GLOBALS.PAGE_ACCESS_TOKEN     = data.attributes.page_access_token;
            process.env.PAGE_ACCESS_TOKEN = data.attributes.page_access_token;

            GLOBALS.APP_SECRET     = data.attributes.app_secret;
            process.env.APP_SECRET = data.attributes.app_secret;

            GLOBALS.SERVER_URL     = data.attributes.server_url;
            process.env.SERVER_URL = data.attributes.server_url;


            console.log("verify_token " + process.env.VALIDATION_TOKEN);
            console.log("page_access_token " + process.env.PAGE_ACCESS_TOKEN);
            console.log("app_secret " + process.env.APP_SECRET);
            console.log("server_url " + process.env.SERVER_URL);

        }else{
            console.log("COULDN'T GET METADATA");
        }
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
