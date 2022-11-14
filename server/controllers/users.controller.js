const usersModel = require('../models/users.model');
// const { sendInvite } = require('../models/email');
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
      notifications: []
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

// const inviteUser = async (req, res) => {
//   try {
//     if (req.user) {
//       // get inviter user (to use in email)
//       const user = await usersModel.findUserByEmail(req.user.email);
//       // check to see if invitee alrady has an account
//       let invitee = await usersModel.findUserByEmail(req.body.email);
//       if (invitee) {
//         // invitee already has account
//         sendInvite(user, invitee, true);
//       } else {
//         invitee = req.body.email;
//         // invitee does not have an account
//         sendInvite(user, invitee, false);
//       }
//     }
//     res.send();
//   } catch (e) {
//     console.log(e);
//   }
// };

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
  deleteUser
};
