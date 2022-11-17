const usersModel = require('../models/users.model');

const bcrypt = require('bcrypt');
const passport = require('passport');

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) console.log(err);
    if (!user) res.send({ user: false });
    else {
      req.logIn(user, (err) => {
        if (err) console.log(err);
        else res.send(user);
      });
    }
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout(function (err) {
    if (err) console.log(err);
    else res.send({});
  });
};

const register = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    // check username doesn't exist
    const isFound = await usersModel.findUserByEmail(email);
    console.log(isFound);
    if (isFound) {
      res.send(JSON.stringify({ existingEmail: true }));
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
    console.log('create user', user);
    res.send(user);
  } catch (e) {
    console.log(e);
  }
};

const get = async (req, res) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.user.email);
      res.send(user);
    } else {
      res.send({ id: false });
    }
  } catch (e) {
    console.log(e);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.params.email);
      res.send(user);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error getuserByEmail in controller', e);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.user.email);
      const id = user._id;
      const deleted = await usersModel.deleteOne(id);
      res.send(deleted);
    } else {
      res.send({ user: false });
    }
  } catch (e) {
    console.log('Error deleteUser in controller', e);
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
