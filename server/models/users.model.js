const client = require('./db');

const { ObjectId } = require('mongodb');

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

const deleteOne = async (id) => {
  const deleted = await users.deleteOne({ _id: ObjectId(id) });
  return deleted;
};

module.exports = { postUser, findUserByEmail, findUserById, deleteOne };
