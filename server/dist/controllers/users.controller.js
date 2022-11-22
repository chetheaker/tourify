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
var usersModel = require('../models/users.model');
var bcrypt = require('bcrypt');
var passport = require('passport');
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport.authenticate('local', function (err, user) {
            if (err)
                console.warn(err);
            if (!user)
                res.status(401).send({ user: false });
            else {
                req.logIn(user, function (err) {
                    if (err)
                        console.warn('Error login in controller', err);
                    else
                        res.send(user);
                });
            }
        })(req, res, next);
        return [2 /*return*/];
    });
}); };
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //Todo: add logout session removal
        req.logout(function (err) {
            if (err)
                console.warn(err);
            else
                res.status(200).send({});
        });
        return [2 /*return*/];
    });
}); };
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, first_name, last_name, password, isFound, hashedPassword, newUser, user, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, first_name = _a.first_name, last_name = _a.last_name, password = _a.password;
                return [4 /*yield*/, usersModel.findUserByEmail(email)];
            case 1:
                isFound = _b.sent();
                if (isFound) {
                    res.status(400).send(JSON.stringify({ existingEmail: true }));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                newUser = {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    notifications: [],
                    account_type: 'basic'
                };
                return [4 /*yield*/, usersModel.postUser(newUser)];
            case 3:
                user = _b.sent();
                res.status(201);
                res.send(user);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                console.warn('Error register in controller', e_1);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var get = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel.findUserByEmail(req.user.email)];
            case 1:
                user = _a.sent();
                res.status(200).send(user);
                return [3 /*break*/, 3];
            case 2:
                res.status(404).send({ id: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.warn('Error get in controller', e_2);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//Might Break
var getUserByEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel.findUserByEmail(req.params.email)];
            case 1:
                user = _a.sent();
                res.status(200).send(user);
                return [3 /*break*/, 3];
            case 2:
                res.status(404).send({ user: false });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                console.warn('Error getuserByEmail in controller', e_3);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, deleted, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!req.user) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.findUserByEmail(req.user.email)];
            case 1:
                user = _a.sent();
                id = user._id;
                return [4 /*yield*/, usersModel.deleteOne(id)];
            case 2:
                deleted = _a.sent();
                res.status(200).send(deleted);
                return [3 /*break*/, 4];
            case 3:
                res.status(404).send({ user: false });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_4 = _a.sent();
                console.warn('Error deleteUser in controller', e_4);
                res.status(500).send({ status: 500 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    register: register,
    login: login,
    get: get,
    logout: logout,
    deleteUser: deleteUser,
    getUserByEmail: getUserByEmail
};
