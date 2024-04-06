const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://pankajkumar:Pankaj7266@cluster0.vmdbmv2.mongodb.net/"
const client = new MongoClient(url);
const dbName = 'passop';

client.connect();
app.use(bodyParser.json());
app.use(cors())

// Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save a password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({ success: true, result: findResult })
})

// Delete password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})