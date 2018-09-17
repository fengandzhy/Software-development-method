
var Config = require('../utils/configuration').Config;
const {MongoClient} = require('mongodb');

// let url = Config.__MONGO_DB_URL__;
let url = "mongodb://localhost:27017/";
let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(url);
  db = connection.db(Config.__MONGO_DB_NAME__);
});

afterAll(async () => {
    await connection.close();
    // await db.close();
});

it('should aggregate docs from collection', async () => {
  const files = db.collection('files');

  await files.deleteMany(
      {}
  );

  await files.insertMany([
    {type: 'Document'},
    {type: 'Video'},
    {type: 'Image'},
    {type: 'Document'},
    {type: 'Image'},
    {type: 'Document'},
  ]);

  const topFiles = await files
    .aggregate([
      {$group: {_id: '$type', count: {$sum: 1}}},
      {$sort: {count: -1}},
    ])
    .toArray();

  expect(topFiles).toEqual([
    {_id: 'Document', count: 3},
    {_id: 'Image', count: 2},
    {_id: 'Video', count: 1},
  ]);
});

it('should have existing notebook item', async () => {
    const inventory = db.collection('inventory');
    const query = {"item": "notebook"};
    const items = await inventory.find(query).toArray();

    expect(items).toBeDefined();
});


