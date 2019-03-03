const express = require("express");
const compression = require("compression");
const path = require("path");
const body_parser = require("body-parser");
const { force_https } = require("./config/force_https");
const { connect } = require("./config/db_connect");
const currencies_details = require( "./client/src/currencies/currencies_details");
const allowed_currencies = currencies_details.map(el => el.symbol);
const { email_achieved_target, check_old } = require("./helper/tasks/jobs");

const { refresh_historical_data, create_latest } = require("./helper/tasks/historical_rates_crud");

const app = express();
const port = process.env.PORT || 5000;


const { send_problem_notification  } = require("./helper/tasks/send_email");

app.use(force_https);
app.use(compression());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));

//Before starting the app make sure the data in historical rates are updated
refresh_historical_data()
.then(success => {
    //Set up chron job
    email_achieved_target();
    check_old();
    //Upon success start the app
    app.listen(port, () => console.log(`Listening on port ${port}`));
})
.catch(err => {
    console.log("Failed to refresh historical data");
    send_problem_notification("Failed to refresh historical data" + JSON.parse(err, null, 2));
})


app.get(/.*/, (req, res) => {
    res.redirect("/") 
}) 

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//POST requests

/**
 * Used to add an entry evry time a user want to watch a currency
 */
app.post("/add_entry", async (req, res) => {
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
            const db = await connect();
            db.collection("entries").insertOne(entry)
            .then(response => res.status(200).send())
        } catch (error) {
            res.status(500).send("Could not insert the entry.");
            send_problem_notification("An error 500 while trying to insert an entry has happened")
        }
    } else {
        res.status(403).send("The submitted data does not conform.")
    }
});


app.post("/get_suggestion", async (req, res)=>{
    //Test if both the initial and target currencies are allowed
    const valid_currencies = [req.body.initial_currency, req.body.target_currency].every(el => allowed_currencies.includes(el));
    //Test if margin is fit
    const valid_margin =  parseFloat(req.body.margin_value);

    if(valid_currencies, valid_margin) {
        const { initial_currency, target_currency } = req.body;

        try {
            const db = await connect();
            db.collection("historical_rates").find( { [`ratios.${initial_currency}.${target_currency}`]: { $gte : valid_margin } } )
            .toArray()
            .then(data => {
                if(data.length){
                    const most_recent = data.sort( (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() )[0];
                    res.send({result: most_recent});
                } else {
                    res.send({result: {}});
                }            
            })
            .catch(err => {
                console.log("Unable to retrieve any data");
                send_problem_notification("There has been a problem in the retrieval of suggestions in the toArray callback.");
                return
            });
        } catch (error) {
            console.log(error)
            send_problem_notification("An error has occured while trying to retrieve suggestions in the returned promise.")
            res.status(500).send("Could not retrieve suggestion.");
        }

    } else {
        console.log(req.body)
        res.status(403).send("The submitted data does not conform to the suggestion scheme.")
    }
});

