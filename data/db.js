const mongoClient = require("mongodb").MongoClient;
const url = ("mongodb://localhost:27017/chat");


async function getColl(url, collName) {
    const client = await mongoClient.connect(url);
    const db = await client.db();
    const coll = await db.collection(collName);
    const res = await coll.find().toArray();

    await client.close();

    return res;
}


async function insertMsg(url, collName, msg) {
     const client = await mongoClient.connect(url);
     const db = await client.db();
     const coll = await db.collection(collName);

    await coll.insertOne(msg);
    await client.close();
}

module.exports = {
    getColl: getColl,
    insertMsg: insertMsg,
};
