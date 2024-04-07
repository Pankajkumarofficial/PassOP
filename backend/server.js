// Import necessary modules and configure your app
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

dotenv.config();

const url = "mongodb+srv://pankajkumar:Pankaj7266@cluster0.vmdbmv2.mongodb.net/";
const client = new MongoClient(url);
const dbName = 'passop';

client.connect();

app.use(bodyParser.json());
app.use(cors());

// Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Save a password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
});

// Delete password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
