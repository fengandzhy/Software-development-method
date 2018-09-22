
var express = require('express');
var router = express.Router();

var DateUtil = require("../utils/DateUtil");
var loginSessionManager = require("../logical/LoginSessionManager");
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');

class BaseAPIRequestProcessor {

    constructor() {
        this._databaseConnection = undefined;
    }

    responseWithSuccess(res) {
        res.json({
            "result": "OK",
        });
        dataBaseConnectionManager.destroyConnection(this._databaseConnection);
    }

    responseWithFailure(res, reason) {
        res.json({
            "result": "Failed",
            "reason": reason
        });
        dataBaseConnectionManager.destroyConnection(this._databaseConnection);
    }

    checkForRequiredRequestParameters(req) {
        var sessToken = req.query.session;
        if (typeof sessToken === 'undefined') {
            return false;
        }
        return true;
    }

    getRequiredRequestParameters() {
        return "session";
    }

    processSubTasks(req, res, next) {

    }

    processRequest(req, res, next) {
        var requiredParams = this.getRequiredRequestParameters();
        if (!this.checkForRequiredRequestParameters(req)) {
            this.responseWithFailure(res, `One of required paramters (${requiredParams}) is missing.`);
            return;
        }

        var sessToken = req.query.session;

        dataBaseConnectionManager.getConnection().then(conn => {
            loginSessionManager.setConnection(conn);
            this._databaseConnection = conn;
    
            loginSessionManager.getUserInfo(sessToken).then(result => {
                
                if (Array.isArray(result) && result.length == 1) {
                    this._loggedInUserInfo = result[0];
                    this.processSubTasks(req, res, next);
                } else {
                    this.responseWithFailure(res, "Invalid session");
                    return;
                }

            }).catch( (err) => {
                this.responseWithFailure(res, "Invalid session: " + err);
                return;
            })
        }).catch( err => {
            this.responseWithFailure(res, "Failed to establish database connection: " + err);
            return;
        });    
    }

    getLoggedInUserInfo() {
        return this._loggedInUserInfo;
    }

    getEstablishedDatabaseConnection() {
        return this._databaseConnection;
    }

}

module.exports = BaseAPIRequestProcessor;