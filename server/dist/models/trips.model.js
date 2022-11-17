"use strict";
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
var client = require('./db');
var usersModel = require('./users.model');
var trips = client.db('tourify').collection('trips');
var users = client.db('tourify').collection('users');
var ObjectId = require('mongodb').ObjectId;
var findTripsByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.find({ user: email }).toArray()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var postTrip = function (trip) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.insertOne(trip)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var findTripById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var trip, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, trips.findOne({ _id: ObjectId(id) })];
            case 1:
                trip = _a.sent();
                return [2 /*return*/, trip];
            case 2:
                e_1 = _a.sent();
                console.log('error findTripById', e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateName = function (id, name) {
    try {
        var trip = trips.updateOne({
            _id: ObjectId(id)
        }, { $set: { trip_name: name } });
        return trip;
    }
    catch (e) {
        console.log('error updateName', e);
    }
};
var updateRoute = function (id, route) {
    try {
        var update = trips.updateOne({ _id: ObjectId(id) }, { $set: { stops: route } });
        return update;
    }
    catch (e) {
        console.log('Error updating route in model', e);
    }
};
var updateItinerary = function (id, itinerary) { return __awaiter(void 0, void 0, void 0, function () {
    var update;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.updateOne({ _id: ObjectId(id) }, { $set: { itinerary: itinerary } })];
            case 1:
                update = _a.sent();
                return [2 /*return*/, update];
        }
    });
}); };
var deleteOne = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.deleteOne({ _id: ObjectId(id) })];
            case 1:
                deleted = _a.sent();
                return [2 /*return*/, deleted];
        }
    });
}); };
var getAllTrips = function () { return __awaiter(void 0, void 0, void 0, function () {
    var exploreTrips;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.find({}).toArray()];
            case 1:
                exploreTrips = _a.sent();
                return [2 /*return*/, exploreTrips];
        }
    });
}); };
var getTripUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var trip, email, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.findOne({ _id: ObjectId(id) })];
            case 1:
                trip = _a.sent();
                email = trip.user;
                return [4 /*yield*/, users.findOne({ email: email })];
            case 2:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var inviteUser = function (id, email) { return __awaiter(void 0, void 0, void 0, function () {
    var trip, inviter, notification, updateInviteeNotifications;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.findOne({ _id: ObjectId(id) })];
            case 1:
                trip = _a.sent();
                return [4 /*yield*/, usersModel.findUserByEmail(trip.user)];
            case 2:
                inviter = _a.sent();
                notification = {
                    trip: {
                        name: trip.trip_name,
                        id: trip._id,
                        start: trip.start_date,
                        end: trip.end_date
                    },
                    inviter: { firstName: inviter.first_name, lastName: inviter.last_name }
                };
                return [4 /*yield*/, users.updateOne({ email: email }, { $push: { notifications: notification } })];
            case 3:
                updateInviteeNotifications = _a.sent();
                return [2 /*return*/, updateInviteeNotifications];
        }
    });
}); };
var acceptInvite = function (id, email) { return __awaiter(void 0, void 0, void 0, function () {
    var updateTrip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // remove notif
            return [4 /*yield*/, usersModel.removeNotification(id, email)];
            case 1:
                // remove notif
                _a.sent();
                return [4 /*yield*/, trips.updateOne({ _id: ObjectId(id) }, { $push: { attendees: email } })];
            case 2:
                updateTrip = _a.sent();
                return [2 /*return*/, updateTrip];
        }
    });
}); };
var declineInvite = function (id, email) { return __awaiter(void 0, void 0, void 0, function () {
    var removedNotif;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersModel.removeNotification(id, email)];
            case 1:
                removedNotif = _a.sent();
                return [2 /*return*/, removedNotif];
        }
    });
}); };
var getFriendTrips = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var friendTrips;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, trips.find({ attendees: [email] }).toArray()];
            case 1:
                friendTrips = _a.sent();
                return [2 /*return*/, friendTrips];
        }
    });
}); };
module.exports = {
    postTrip: postTrip,
    findTripsByEmail: findTripsByEmail,
    findTripById: findTripById,
    updateName: updateName,
    updateRoute: updateRoute,
    updateItinerary: updateItinerary,
    deleteOne: deleteOne,
    getAllTrips: getAllTrips,
    getTripUser: getTripUser,
    inviteUser: inviteUser,
    acceptInvite: acceptInvite,
    declineInvite: declineInvite,
    getFriendTrips: getFriendTrips
};
