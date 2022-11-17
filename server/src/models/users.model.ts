import { Notification, User } from "../types/types";

const client = require('./db');

const { ObjectId } = require('mongodb');

const users = client.db('tourify').collection('users');

const postUser = (user: User) => {
  return users.insertOne(user);
};

const findUserByEmail = async (email: string) => {
  const user = await users.findOne({ email: email });
  return user;
};

const findUserById = async (id: string) => {
  const user = await users.findOne({ _id: id });
  return user;
};

const deleteOne = async (id: string) => {
  const deleted = await users.deleteOne({ _id: ObjectId(id) });
  return deleted;
};

const removeNotification = async (id: string, email: string) => {
  const user = await users.findOne({ email: email });
  const { notifications } = user;
  const newNotifs = notifications.filter((notif: Notification) => {
    return notif.trip.id != id;
  });
  const updatedNotifs = await users.updateOne(
    { email: email },
    { $set: { notifications: newNotifs } }
  );
  return updatedNotifs;
};

const upgradeAccountToPro = async (email: string) => {
  const upgraded = await users.updateOne(
    { email: email },
    { $set: { account_type: 'pro' } }
  );
  return upgraded;
};

module.exports = {
  postUser,
  findUserByEmail,
  findUserById,
  deleteOne,
  removeNotification,
  upgradeAccountToPro
};
