
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
    }

    responseWithFailure(res, reason) {
        res.json({
            "result": "Failed",
            "reason": reason
        });
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
        return new Promise( (resolve, reject) => {
            resolve();
        });
    }

    _connectToDatabase() {
        return dataBaseConnectionManager.getConnection().then( conn => {
            loginSessionManager.setConnection(conn);
            this._databaseConnection = conn;
        }).catch( err => {
            this.responseWithFailure(res, "Failed to establish database connection: " + err);
        });
    }

    queryUserInfoWith(res, sessToken) {
        return loginSessionManager.getUserInfo(sessToken).then(result => {
            if (Array.isArray(result) && result.length == 1) {
                this._loggedInUserInfo = result[0];
            } else {
                this.responseWithFailure(res, "Invalid session.");
            }
        }).catch( (err) => {
            this.responseWithFailure(res, "Invalid session: " + err);
        });
    }

    processRequest(req, res, next) {
        var requiredParams = this.getRequiredRequestParameters();
        if (!this.checkForRequiredRequestParameters(req)) {
            this.responseWithFailure(res, `One of required paramters (${requiredParams}) is missing.`);
            return new Promise( (resolve, reject) => {
                resolve();
            });;
        }
        var sessToken = req.query.session;

        return this._connectToDatabase().then(
            () => { return this.queryUserInfoWith(res, sessToken); }
        ).then(
            () => { 
                if (typeof (this.getLoggedInUserInfo()) === 'undefined') return;
                return this.processSubTasks(req, res, next); 
            }
        ).then(
            () => { return dataBaseConnectionManager.destroyConnection(this._databaseConnection); }
        );
    }

    getLoggedInUserInfo() {
        return this._loggedInUserInfo;
    }

    getEstablishedDatabaseConnection() {
        return this._databaseConnection;
    }

}

module.exports = BaseAPIRequestProcessor;