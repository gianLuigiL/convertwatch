const express = require("express");
const body_parser = require("body-parser");
const {MongoClient} = require("mongodb");
const { database } = require("./config/db_connect");

let db;

MongoClient.connect(database,{useNewUrlParser: true} ,(err, client) => {
    if(err) {
        console.log("Unable to connect to MongoDB database");
        return;
    }

    console.log("Connected to MongoDB database");
    db = client.db("Convertwatch");

    app.listen(port, () => console.log(`Listening on port ${port}`));
})

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/client/build"))

//GET requests

app.get(/.*/, (req, res) => {
    res.redirect("/");
})

//POST requests
app.post("")
