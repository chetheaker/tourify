const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017/');

(async function () {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(e);
  }
})();

module.exports = client;
