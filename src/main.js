import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app =express();
app.use(cors());

async function addRecord(req,res){
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    let db = client.db("mydb");
    let messageCollection = db.collection("message");

    let inputDoc ={
         message : req.query.message || "default"};
    await messageCollection.insertOne(inputDoc);
    await client.close();

    console.log("Record Added");
    //res.send("Record Added");
    res.json({opr:"success"})
}

async function findAllMessage(req,res){
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    let db = client.db("mydb");
    let messageCollection = db.collection("message");
    let list = await messageCollection.find().toArray();
    
    await client.close();
    res.json(list)
}

// http://localhost:4000/addRecord
app.get("/addRecord",addRecord)
// http://localhost:4000/findAllMessage
app.get("/findAllMessage",findAllMessage)
// http://localhost:4000/
app.listen(4000)