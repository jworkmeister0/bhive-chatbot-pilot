"use strict";

/**
 * Holds configuration
 */
module.exports = (function () {
    // Private values
    // DON'T PUT ANYTHING HERE!!!!!!
    var GLOBALS = {
        APP_SECRET: "shhhhh",
        VALIDATION_TOKEN: "nope",
        PAGE_ACCESS_TOKEN: "this is data",
        SERVER_URL: "asdfasdf"
    };


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
        }
    };
}());
