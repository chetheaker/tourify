"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require google from googleapis package.
var google = require('googleapis').google;
// Require oAuth2 from our google instance.
var OAuth2 = google.auth.OAuth2;
var tripsModel = require('../models/trips.model');
var getUserTrips = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trips, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, tripsModel.findTripsByEmail(req.user.email)];
            case 1:
                trips = _a.sent();
                res.status(200).send(trips);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.warn("error getting users' trips", e_1);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getExploreTrips = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trips, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, tripsModel.getAllTrips()];
            case 1:
                trips = _a.sent();
                res.status(200).send(trips);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.warn("error getting users' trips", e_2);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getFriendTrips = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trips, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, tripsModel.getFriendTrips(req.user.email)];
            case 1:
                trips = _a.sent();
                res.status(200).send(trips);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                console.warn("error getting users' trips", e_3);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getUserTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, trip, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                return [4 /*yield*/, tripsModel.findTripById(id)];
            case 1:
                trip = _a.sent();
                if (!trip)
                    res.status(404).send({ _id: false });
                else
                    res.status(200).send(trip);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                console.warn('error getting trip', e_4);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var createTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trip, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                trip = __assign(__assign({}, req.body), { user: req.user.email, checklists: [], attendees: [] });
                return [4 /*yield*/, tripsModel.postTrip(trip)];
            case 1:
                result = _a.sent();
                res.status(201);
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                console.warn('error getting trip', e_5);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateTripName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name_1, updated, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                name_1 = req.body.name;
                return [4 /*yield*/, tripsModel.updateName(id, name_1)];
            case 1:
                updated = _a.sent();
                res.status(200).send(updated);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_6 = _a.sent();
                console.warn('error getting trip', e_6);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateTripRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, route, updated, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                route = req.body.route;
                return [4 /*yield*/, tripsModel.updateRoute(id, route)];
            case 1:
                updated = _a.sent();
                res.status(200).send(updated);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_7 = _a.sent();
                console.warn('error updating trip route', e_7);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateTripItinerary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, itinerary, updated, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                itinerary = req.body.itinerary;
                return [4 /*yield*/, tripsModel.updateItinerary(id, itinerary)];
            case 1:
                updated = _a.sent();
                res.status(200).send(updated);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_8 = _a.sent();
                console.warn('Error updateTripItinerary in controller', e_8);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleted, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                return [4 /*yield*/, tripsModel.deleteOne(id)];
            case 1:
                deleted = _a.sent();
                res.status(200).send(deleted);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_9 = _a.sent();
                console.warn('Error deleteTrip in controller', e_9);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getTripUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                return [4 /*yield*/, tripsModel.getTripUser(id)];
            case 1:
                user = _a.sent();
                res.status(200).send(user);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_10 = _a.sent();
                console.warn('Error in getTripUser controller', e_10);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var inviteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, email, result, e_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                _a = req.params, id = _a.id, email = _a.email;
                return [4 /*yield*/, tripsModel.inviteUser(id, email)];
            case 1:
                result = _b.sent();
                res.status(200).send(result);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_11 = _b.sent();
                console.warn('Error inviting user', e_11);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var acceptInvite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, accepted, e_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                email = req.user.email;
                return [4 /*yield*/, tripsModel.acceptInvite(id, email)];
            case 1:
                accepted = _a.sent();
                res.status(200).send(accepted);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_12 = _a.sent();
                console.warn('error accepting invite', e_12);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var declineInvite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, email, declined, e_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                id = req.params.id;
                email = req.user.email;
                return [4 /*yield*/, tripsModel.declineInvite(id, email)];
            case 1:
                declined = _a.sent();
                res.status(200).send(declined);
                return [3 /*break*/, 3];
            case 2:
                res.status(401).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_13 = _a.sent();
                console.warn('error declining invite', e_13);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var exportTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var events, access_token, oAuth2Client, calendar_1;
    return __generator(this, function (_a) {
        if (!req.user) {
            res.status(401).send({ status: 401 });
            return [2 /*return*/];
        }
        try {
            events = req.body.events;
            access_token = req.body.access_token;
            oAuth2Client = new OAuth2(process.env.CALENDAR_CLIENT_ID, process.env.CALENDAR_SECRET);
            oAuth2Client.setCredentials({ access_token: access_token });
            calendar_1 = google.calendar({ version: "v3", auth: oAuth2Client });
            events.forEach(function (event) {
                calendar_1.events.insert({
                    calendarId: "primary",
                    resource: event
                });
            });
            res.status(200).send({ status: 200 });
        }
        catch (e) {
            console.warn("error exporting trip", e);
            res.status(500).send({ status: 500 });
        }
        return [2 /*return*/];
    });
}); };
module.exports = {
    getUserTrips: getUserTrips,
    getExploreTrips: getExploreTrips,
    getUserTrip: getUserTrip,
    createTrip: createTrip,
    updateTripName: updateTripName,
    updateTripRoute: updateTripRoute,
    updateTripItinerary: updateTripItinerary,
    deleteTrip: deleteTrip,
    getTripUser: getTripUser,
    inviteUser: inviteUser,
    acceptInvite: acceptInvite,
    declineInvite: declineInvite,
    getFriendTrips: getFriendTrips,
    exportTrip: exportTrip
};
