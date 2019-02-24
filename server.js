const express = require("express");
const body_parser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/client/build"))


app.listen(port, () => console.log(`Listening on port ${port}`));