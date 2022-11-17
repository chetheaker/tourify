require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.DB_URL ||'mongodb://localhost:27017/tourify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

(async function () {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(e);
  }
})();

module.exports = client;
