"use strict";

/**
 * Holds configuration
 */
module.exports = (function () {
    var projectID = "chatbot-pilot";


    // Private values
    // DON'T HARDCODE ANYTHING HERE!!!!!!
    var GLOBALS = {
        APP_SECRET: "",
        VALIDATION_TOKEN: "",
        meta: "",
        PAGE_ACCESS_TOKEN: "this is data",
        SERVER_URL: "asdfasdf"
    };

    configureGlobalsFromProjectMetadata();

    function configureGlobalsFromProjectMetadata(){
        var metadata = require("google-compute-metadata");

        metadata.instance(function (err, data) {
            console.log("Instance Id: " +  data.id);
        });

        metadata.project(function (err, data) {
            console.log("Project Id: " +  data.projectId);
            GLOBALS.meta = data;
        });
    }


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
