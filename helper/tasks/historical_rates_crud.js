
//Bring fetch fucntion to node
const fetch = require("node-fetch");
//Database hook
const  { connect } = require("../../config/db_connect");
//Helper function for dates
const date_functions = require("../date_functions");
//Send email on error
const { send_problem_notification } = require("./send_email");
//Function to process rates
const { process_historical_rates, get_rates } = require("../server_converter_functions");

//Every async function implicitly returns a promise.


/**
 * Returns a promise wrapping the complete relative rates for every currency for today.
 * @returns {Promise<any>} Resolves to the complete relative rates for today.
 */

const get_latest_from_api = async () => {

    return fetch("https://api.exchangeratesapi.io/latest")
    .then(json_data => json_data.json())
    //The API returns rates relative to the EUR
    .then(eur_based_rates => {
        //Inject the 1:1 rate for EUR
        const complete_eur_based_rates = {...eur_based_rates.rates, EUR: 1};
        //get_rates generates rates in every base currency
        return get_rates(complete_eur_based_rates)
    })
    .catch(err => {
        console.log(err, "Failed to get latest data from currency API @historical_rates_crud.js in 'get_latest_from_api'")
        send_problem_notification("Failed to get latest data from currency API @historical_rates_crud.js in 'get_latest_from_api'");
        return Promise.reject(err);    
    })
}

/**
 * Get the latest entry for today from own database to avoid multiple API connections, it's a goodwill API avoid abuse.
 * @returns {Promise<any>} Document for today rates {date: YYYY-MM-DD, rates: {...}}
 */
const get_latest_rate = async () => {
    //Get the connection
    let db;
    try {
        db = await connect();
    } catch (err) {
        console.log(`There was a problem connecting to the database @historical_rates_crud.js in "get_latest_rate"`);
        send_problem_notification(`There was a problem connecting to the database @historical_rates_crud.js in "get_latest_rate"`);
        return false;
    }
    //Get the document with date property set to today YYYY-MM-DD
    return db.collection("historical_rates").findOne({date: date_functions.get_today_string()})
    .then(today_document => {
        return today_document;
    })
    .catch(err => {
        console.log(`There was a problem connecting to the database in "get_latest_rate"`);
        send_problem_notification(`There was a problem connecting to the database in "get_latest_rate"`);
        return err;
    });
}

/**
 * Inserts latest todays entry in the database, the API updates at 5pm, so this gets the latest whatever the hour.
 * @returns {Promise<boolean>} Returns a Promise of boolean true on success.
 */

const create_latest = async () => {
    //Get the connection
    let db;
    try {
        db = await connect();
    } catch (err) {
        console.log(`There was a problem connecting to the database @historical_rates_crud.js in "create_latest"`);
        send_problem_notification(`There was a problem connecting to the database @historical_rates_crud.js in "create_latest"`);
        return false;
    }
    //Get the latest todays rates
    return get_latest_from_api().then(results => {
        //Generate a document to be inserted
        const today_document = {
            date: date_functions.get_today_string(),
            rates: results
        };
        db.collection("historical_rates").insertOne(today_document)
        //Upon success returns an implicit promise for chaining
        .then(success => {
            //Returns implicit Promise for chaining
            return true;
        })
        .catch(err => {
            console.log(err, "Failed to create latest currency value in database @historical_rates_crud.js in 'create_latest'")
            send_problem_notification("Failed to create latest currency value in database @historical_rates_crud.js in 'create_latest'");
            return err;
        })
    })
}

/**
 * Inserts historical data from six months ago up to yesterday (due to the timing of the API today might or might not be updated so it's a separate function).
 * @returns {Promise<boolean>} Returns a Promise of boolean true on success.
 */
const create_historical_data = async () => {
    //Get connection
    let db;
    try {
        db = await connect();
    } catch (err) {
        console.log(`There was a problem connecting to the database @historical_rates_crud.js in "create_historical_data"`);
        send_problem_notification(`There was a problem connecting to the database @historical_rates_crud.js in "create_historical_data"`);
        return false;
    }
    //Historical data only go back up to six months ago, here it builds the necessary strings YYYY-MM-DD.
    const yesterday_string = date_functions.get_yesterday_string();
    const six_months_ago_string = date_functions.get_six_months_ago_string();

    //Get the historical data.
    fetch(`https://api.exchangeratesapi.io/history?start_at=${six_months_ago_string}&end_at=${yesterday_string}`)
    .then(json_data => json_data.json())
    //The API bases it's data in the EUR currency, for ease of access it generates every other base.
    .then(eur_based_historical_rates => {
        //Returns an array of objects { date: YYYY-MM-DD, rates: {...rates_of_the_date} }.
        const historical_rates = process_historical_rates(eur_based_historical_rates);
        //Insert the rates relative to every currency in the DB, one for each day in the past 6 months up to yesterday.
        db.collection("historical_rates").insertMany(historical_rates)

        //On succes of this operation return promise for chaining.
        .then(success => {
            return true;
        })
        .catch(err => {
            console.log(err, "Failed to insert historical rates @historical_rates_crud.js in 'create_historical_data'")
            send_problem_notification("Failed to insert historical rates @historical_rates_crud.js in 'create_historical_data'");
            return err;
        })
    })
    .catch(err => {
        console.log("Failed to complete the creation of historical rates @historical_rates_crud.js in create_historical_data.");
        send_problem_notification("Failed to complete the creation of historical rates @historical_rates_crud.js in create_historical_data.");
        return err;
    })
}

/**
 * Returns a Promise that resolves to an object with a "deletedCount" property matching the documents affected.
 * @returns {Promise<any>} A document with a deletedCount property matching the affected documents.
 */

const delete_historical_rates = async () => {
    //Get the connection
    let db;
    try {
        db = await connect();
    } catch (err) {
        console.log(err);
        send_problem_notification(`There was a problem connecting to the database in "get_historical_data", here's the error: ${JSON.stringify(err, null, 2)}`);
        return false;
    }
    //Delete every previous historical entry
    return db.collection("historical_rates").deleteMany({});
}

/**
 * Returns a Promise that resolves to an object with a "deletedCount" property matching the documents affected.
 * @returns {Promise<any>} A document with a deletedCount property matching the affected documents.
 * 
 */

const delete_today_rates = async () => {
    //Get the connection
    let db;
    try {
        db = await connect();
    } catch (err) {
        console.log(err, `There was a problem connecting to the database @ historical_artes_crud.js in "get_historical_data"`);
        send_problem_notification(`There was a problem connecting to the database @ historical_artes_crud.js in "get_historical_data"`);
        return false;
    }
    //Delete the matched document
    return db.collection("historical_rates").deleteOne({date: date_functions.get_today_string()});
}

/**
 * Refresh the historical rates from six months ago up to today, since today might or might not be updated, it deletes it and retrieve the latest for today.
 * @returns {Promise<boolean>} Returns a Promise of boolean true on success.
 */

const refresh_historical_data = async () => {
    //Delete every historical data
    return delete_historical_rates()
    .then(success => {
        //Upon success get historical data up to yesterday
        create_historical_data()
        .then(success => {
            //Add todays entry with the latest value
            create_latest()
            //Returns a Promise<true> if everything went alright
            .then(success => true)
            .catch(err => {
                console.log(err, `There was a problem creating today's entry @historical_rates_crud.js in 'refresh historical_data'`);
                send_problem_notification(`There was a problem creating today's entry @historical_rates_crud.js in 'refresh historical_data'`);
                return false;            
            })
        })
        .catch(err => {
            console.log(err, `There was a problem creating historical data @historical_rates_crud.js in 'refresh_historical_data'`);
            send_problem_notification(`There was a problem creating historical data @historical_rates_crud.js in 'refresh_historical_data'`);
            return false;
        })
    })
    .catch(err => {
        console.log("Failed to delete historical data @ historical_rates_crud.js in 'refresh_historical_data'", err);
        send_problem_notification("Failed to delete historical data @ historical_rates_crud.js in 'refresh_historical_data'");
        return err;    
    })
}



module.exports = {
    get_latest_from_api,
    get_latest_rate,
    create_latest,
    create_historical_data,
    delete_historical_rates,
    delete_today_rates,
    refresh_historical_data
}