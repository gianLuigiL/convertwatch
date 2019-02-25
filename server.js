const express = require("express");
const body_parser = require("body-parser");
const {MongoClient} = require("mongodb");
const { database } = require("./config/db_connect");
const fetch = require("node-fetch");
const currencies_details = require( "./client/src/currencies/currencies_details");
const allowed_currencies = currencies_details.map(el => el.symbol);

const { processHistoricalRatios } = require("./helper/server_converter_functions");

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/client/build"))

let db;

MongoClient.connect(database,{useNewUrlParser: true} ,(err, client) => {
    //If there's an error don't launch the app
    if(err) {
        console.log("Unable to connect to MongoDB database");
        return;
    }

    console.log("Connected to MongoDB database");
    //Bring the database outside
    db = client.db("Convertwatch");

    //Historical data only got back up to six months ago, here constructs the necessary strings
    //A library is not worth for 6 lines
    const today_date = new Date();
    const today = today_date.getTime(); //Today in milliseconds
    const six_months = 1000 * 60 * 60 * 24 * 30 * 6; //Six month in milliseconds (rounded to 30 days per month)
    const six_months_ago = today - six_months;
    const six_months_ago_date = new Date(six_months_ago);

    const today_string = `${today_date.getFullYear()}-${ (today_date.getMonth() + 1).toString().padStart(2, "0") }-${today_date.getDate().toString().padStart(2, "0")}`
    const six_months_ago_string = `${six_months_ago_date.getFullYear()}-${ (six_months_ago_date.getMonth() + 1).toString().padStart(2, "0") }-${six_months_ago_date.getDate().toString().padStart(2, "0")}`
    //Get the historical data
    fetch(`https://api.exchangeratesapi.io/history?start_at=${six_months_ago_string}&end_at=${today_string}`)
    .then(json_data => json_data.json())
    .then(eur_based_historical_rates => {
        //Returns an array of objects { date: YYYY-MM-DD, ratios: {...rates_of_the_day} }
        const historical_rates = processHistoricalRatios(eur_based_historical_rates)
        //Delete evry previous historical entry
        db.collection("historical_rates").deleteMany({})

        //Upon success recreate the table
        .then(success => {
            console.log("Removed old historical rates");
            db.collection("historical_rates").insertMany(historical_rates)

            //On succes of this operation launch the app
            .then(success => {
                console.log("Inserted updated historical rates");
                app.listen(port, () => console.log(`Listening on port ${port}`));
            })
            .catch(err => {
                console.log(err, "Failed to insert new historical rates")
            })
        })
        .catch(err => {
            console.log("Failed to remove old historical data");
        })
    //This catches errors in the exchange API request
    }).catch(err => console.log(err));
})

//GET requests

app.get(/.*/, (req, res) => {
    res.redirect("/") 
})

//POST requests

/**
 * Used to add an entry evry time a user want to watch a currency
 */
app.post("/add_entry", (req, res) => {
    //Test if both the initial and target currencies are allowed
    const valid_currencies = [req.body.initial_currency, req.body.target_currency].every(el => allowed_currencies.includes(el));
    //Test if margin is fit
    const valid_margin = typeof req.body.margin_value === "number";
    //Validate email
    const valid_email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(req.body.email);

    if(valid_currencies, valid_margin, valid_email) {
        const { initial_currency, target_currency, margin_value, email } = req.body;
        const entry = { initial_currency, target_currency, margin_value, email };
        try {
            db.collection("entries").insertOne(entry)
            .then(response => res.status(200).send())
        } catch (error) {
            res.status(500).send("Could not insert the entry.");
        }
    } else {
        res.status(403).send("The submitted data does not conform.")
    }
});


app.post("/get_suggestion", (req, res)=>{
    //Test if both the initial and target currencies are allowed
    const valid_currencies = [req.body.initial_currency, req.body.target_currency].every(el => allowed_currencies.includes(el));
    //Test if margin is fit
    const valid_margin =  parseFloat(req.body.margin_value);

    if(valid_currencies, valid_margin) {
        const { initial_currency, target_currency } = req.body;

        try {
            db.collection("historical_rates").find( { [`ratios.${initial_currency}.${target_currency}`]: { $gte : valid_margin } } )
            .toArray((err, data)=>{
                if(err) {
                    console.log("Unable to retrieve any data");
                    return
                }

                console.log(data);
                console.log(data.length);
                console.log(initial_currency, target_currency, valid_margin);
                if(data.length){
                    const most_recent = data.sort( (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() )[0];
                    res.send({result: most_recent});
                } else {
                    res.send({result: {}});
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).send("Could not retrieve suggestion.");
        }

    } else {
        console.log(req.body)
        res.status(403).send("The submitted data does not conform to the suggestion scheme.")
    }
})
