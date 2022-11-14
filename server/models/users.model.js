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

const removeNotification = async (id, email) => {
  const user = await users.findOne({ email: email });
  console.log('user with notification', user);
  const { notifications } = user;
  const newNotifs = notifications.filter((notif) => {
    return notif.trip.id != id;
  });
  // user.notifications = newNotifs;
  // console.log('new Notifcs', newNotifs);
  const updatedNotifs = await users.updateOne(
    { email: email },
    { $set: { notifications: newNotifs } }
  );
  return updatedNotifs;
};

module.exports = {
  postUser,
  findUserByEmail,
  findUserById,
  deleteOne,
  removeNotification
};
