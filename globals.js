/**
 * Holds configuration
 */
module.exports = function () {
    // Private values
    var GLOBALS = {
        APP_SECRET: "",
        VALIDATION_TOKEN: "",
        PAGE_ACCESS_TOKEN: "",
        SERVER_URL: ""
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
};
