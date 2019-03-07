//Get dependency to actually connetc to the databse
const { MongoClient } = require("mongodb");
//Function to send me an email
const { send_problem_notification } = require("../helper/tasks/send_email");
//Database is different in test and on Heroku
let database = "";
//Cache the connection
let connection;

//If on Heroku
 if(process.env.PORT) {
    database = "mongodb://heroku_tld6rz1j:62h46paeuqh4g3hi7h2erlpe0c@ds139435.mlab.com:39435/heroku_tld6rz1j";
} else {
    database = "mongodb://localhost:27017/Convertwatch";
}

/**
 * Initializes a conenction to the database, if already connected returns the cached one.
 * @returns {Promise<any>} A promise of connection to the database
 */
const connect = () => {
    //If already connected return hook
    if(connection) {
        return Promise.resolve(connection);
    } else {
        //Try to connect to the database
        return MongoClient.connect(database, {useNewUrlParser: true})
        //Return the database hook wrapped in Promise
        .then(client => Promise.resolve (connection = client.db(process.env.PORT ? "heroku_tld6rz1j" : "Convertwatch")))
        .catch(err => {
            console.log("There was an error connecting to the database");
            send_problem_notification("There was an error connecting to the database @ db_connect.js in 'connect'");
            return Promise.reject(err)
        })
    }
}




module.exports = {
    connect
}