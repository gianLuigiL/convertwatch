const express = require("express");
const body_parser = require("body-parser");
const {MongoClient} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/Convertwatch",{useNewUrlParser: true} ,(err, client) => {
    if(err) {
        console.log("Unable to connect to MongoDB database");
        return;
    }
    console.log("Connected to MongoDB database");
    const db = client.db("Convertwatch")
    client.close();
})

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/client/build"))

app.post(/.*/, (req, res) => {
    /* res.redirect("/"); */
    console.log(req.body);
    res.status(200).send(req.body);
})

app.listen(port, () => console.log(`Listening on port ${port}`));