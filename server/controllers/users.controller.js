const usersModel = require('../models/users.model');

const login = (req, res) => {
  res.send('login');
};

const register = (req, res) => {
  res.send('create');
};

const get = async (req, res) => {
  try {
    if (req.user) {
      const user = await usersModel.findUserByEmail(req.user.email);
      res.send(user);
    } else {
      res.send(req.user);
    }
  } catch (e) {
    console.log('Error getting user', e);
  }
};

const logout = (req, res) => {
  res.send('logout');
};

module.exports = { login, register, get, logout };
