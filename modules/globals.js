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
        var gcloud = require("google-cloud");
        var resource = gcloud.resource;

        var resourceClient = resource({
            projectId: projectID
        });
        resourceClient.getProjects(function(err, projects) {
                console.log(projects);
        });
        var project = resourceClient.project();

        project.getMetadata(function(err, metadata){
            console.log(metadata);
            GLOBALS.meta = metadata;
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
