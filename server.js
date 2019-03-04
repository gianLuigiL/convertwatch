//Express and middleware
const express = require("express");
const body_parser = require("body-parser");
const compression = require("compression");
const { force_https } = require("./config/force_https");
const path = require("path");

//Connection to the database hook
const { connect } = require("./config/db_connect");

//Symbol and descr of every allowed currency
const currencies_details = require( "./client/src/currencies/currencies_details");
//Array of symbols for ease of use
const allowed_currencies = currencies_details.map(el => el.symbol);

//Jobs to run with cron send email to expired and completed entries
const { email_achieved_target, check_old } = require("./helper/tasks/jobs");

//Reset historical rates up to six months ago
const { refresh_historical_data } = require("./helper/tasks/historical_rates_crud");

//Email function to send me a notification
const { send_problem_notification, send_notification  } = require("./helper/tasks/send_email");

const app = express();
//Heroku uses PORT but dev uses 5000
const port = process.env.PORT || 5000;

//Apply middleware
app.use(force_https);  //Always on https
app.use(compression());  //Compress data
app.use(body_parser.json());  //Parse body of requests
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));  //Serve client build

//Before starting the app make sure the data in historical rates are updated
refresh_historical_data()
.then(success => {
    //Set up chron jobs, email entries who achieved the target and removed expired entries
    email_achieved_target();
    check_old();
    //Upon success start the app
    app.listen(port, () => console.log(`Listening on port ${port}`));
})
.catch(err => {
    console.log("Failed to refresh historical data  app launch");
    send_problem_notification("Failed to refresh historical data" + JSON.parse(err, null, 2));
})

//Redirect every quirky URL to the home
app.get(/.*/, (req, res) => {
    res.redirect("/") 
}) 

//Serve the files in build folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//POST requests


//Used to add an entry every time a user want to watch a currency
app.post("/add_entry", async (req, res) => {
    //Test if both the initial and target currencies are allowed
    const valid_currencies = [req.body.initial_currency, req.body.target_currency].every(el => allowed_currencies.includes(el));
    //Test if margin value is number, it should be a value like 1.2334455.
    const valid_margin = typeof req.body.margin_value === "number";
    //Validate email
    const valid_email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(req.body.email);

    if(valid_currencies && valid_margin && valid_email) {
        //Get the values out of body
        const { initial_currency, target_currency, margin_value, email } = req.body;
        const entry = { initial_currency, target_currency, margin_value, email };
        //Insert if db connects
        try {
            const db = await connect();
            db.collection("entries").insertOne(entry)
            .then(response => res.status(200).send())
        } catch (error) {
            res.status(500).send("Could not insert the entry.");
            send_problem_notification("An error 500 while trying to insert an entry has happened")
        }
    } else {
        //Let the user know if validation fails
        res.status(403).send("The submitted data does not conform.")
    }
});

//Used to retrieve when a margin at least high as the one passed was achieved for these currencies
app.post("/get_suggestion", async (req, res)=>{
    //Test if both the initial and target currencies are allowed
    const valid_currencies = [req.body.initial_currency, req.body.target_currency].every(el => allowed_currencies.includes(el));
    //Get the margin as number
    const valid_margin =  parseFloat(req.body.margin_value);

    if(valid_currencies, valid_margin) {
        const { initial_currency, target_currency } = req.body;

        try {
            const db = await connect();
            //Return docs in historical_rates.ratios.USD.EUR where the value is greater or eq to the passed margin
            db.collection("historical_rates").find( { [`ratios.${initial_currency}.${target_currency}`]: { $gte : valid_margin } } )
            //Get them in the structure of an array
            .toArray()
            .then(data => {
                //If anything matches
                if(data.length){
                    //Get the closest point in time where it has happened
                    const most_recent = data.sort( (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() )[0];
                    res.send({result: most_recent});
                } else {
                //Otherwise send an empty object
                    res.send({result: {}});
                }            
            })
            .catch(err => {
                console.log("Unable to convert data into array @ server.js get_suggestion");
                send_problem_notification("Unable to convert data into array @ get_suggestion.");
                return
            });
        } catch (error) {
            console.log(error)
            send_problem_notification("An error has occured while trying to connect to the DB @ server.js get_suggestion.")
            res.status(500).send("An error has occured while trying to connect to the DB @ server.js get_suggestion.");
        }

    } else {
        console.log(req.body)
        res.status(403).send("The submitted data does not conform to the suggested format.")
    }
});

