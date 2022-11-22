import { NextFunction, Request, Response } from "express";
import { MyRequest, User } from "../types/types";

const usersModel = require('../models/users.model');

const bcrypt = require('bcrypt');
const passport = require('passport');

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: User) => {
    if (err) console.warn(err);
    if (!user) res.status(401).send({ user: false });
    else {
      req.logIn(user, (err) => {
        if (err) console.warn('Error login in controller',err);
        else res.send(user);
      });
    }
  })(req, res, next);
};

const logout = async (req: Request, res: Response) => {
  //Todo: add logout session removal
  req.logout(function (err) {
    if (err) console.warn(err);
    //Might Break
    else res.status(205).send({});
  });
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    // check username doesn't exist
    const isFound = await usersModel.findUserByEmail(email);
    if (isFound) {
      res.status(400).send(JSON.stringify({ existingEmail: true }));
      return;
    }
    // hash pw
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      notifications: [],
      account_type: 'basic'
    };
    const user = await usersModel.postUser(newUser);
    res.status(201);
    res.send(user);
  } catch (e) {
    console.warn('Error register in controller', e);
    res.status(500).send({status:500})
  }
};

const get = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.user.email);
      res.status(200).send(user);
    } else {
      res.status(404).send({ id: false });
    }
  } catch (e) {
    console.warn('Error get in controller', e);
    res.status(500).send({status:500})
  }
};

//Might Break
const getUserByEmail = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.params.email);
      res.status(200).send(user);
    } else {
      res.status(404).send({ user: false });
    }
  } catch (e) {
    console.warn('Error getuserByEmail in controller', e);
    res.status(500).send({status:500})
  }
};

const deleteUser = async (req: MyRequest, res: Response) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.user.email);
      const id = user._id;
      const deleted = await usersModel.deleteOne(id);
      res.status(200).send(deleted);
    } else {
      res.status(404).send({ user: false });
    }
  } catch (e) {
    console.warn('Error deleteUser in controller', e);
    res.status(500).send({status:500})
  }
};

module.exports = {
  register,
  login,
  get,
  logout,
  deleteUser,
  getUserByEmail
};
