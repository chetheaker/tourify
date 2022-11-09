const client = require('./db');

const users = client.db('tourify').collection('users');

const postUser = (user) => {
  return users.insertOne(user);
};

const findUserByEmail = async (email) => {
  const user = await users.findOne({ email: email });
  return user;
};

const findUserById = async (id) => {
  const user = await users.findOne({ _id: id });
  return user;
};

module.exports = { postUser, findUserByEmail, findUserById };
