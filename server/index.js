import express from "express";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
const app = express();
const port = "5000";
app.use(express.json());
app.use(cors());
const client = new MongoClient(process.env.MONGO_DB_CLIENT);
const connectToMongoDb = async () => {
  try {
    await client.connect();
    console.log("connected to mongodb");
    return client;
  } catch (error) {
    console.log(error);
  }
};
await connectToMongoDb();
const database = client.db("todo");
const listCollection = database.collection("list_data"); //! what is the difference between collections and collection
// don't forget to use find and toArray when you want all data from a single collection
//REF: https://www.mongodb.com/docs/drivers/node/current/crud/query/cursor/#std-label-node-access-cursor
//* READ DATA (all data)
app.get("/lists", async(req, res) => {
  const listData = await listCollection.find({}).toArray();
  res.send(listData);
});
//* INSERT DATA
app.post("/", async (req, res) => {
  const list = req.body;
  const result = await listCollection.insertOne(list);
  res.send(result);
});
//* DELETE DATA
app.delete("/delete", async (req, res) => {
  const query = { _id: new ObjectId(req.body._id) };
  const result = await listCollection.deleteOne(query);
  res.send(result);
});
//* UPDATE DATA
app.patch("/update", async (req, res) => {
  const query = { _id: new ObjectId(req.body._id) };
  const options = { upsert: true };
  const updateDocument = {
    $set: {
      completed: req.body.completed,
    },
  };
  const result = await listCollection.updateOne(query, updateDocument, options);
  res.send(result);
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
//! CRUD