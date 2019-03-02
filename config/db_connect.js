const { send_problem_notification } = require("../helper/tasks/send_email");
const { MongoClient } = require("mongodb");
let database = "";
let connection;

 if(process.env.PORT) {
    database = "mongodb://heroku_tld6rz1j:62h46paeuqh4g3hi7h2erlpe0c@ds139435.mlab.com:39435/heroku_tld6rz1j";
} else {
    database = "mongodb://localhost:27017/Convertwatch";
}
const connect = () => {
    if(connection) {
        return Promise.resolve(connection);
    } else {
        return MongoClient.connect(database, {useNewUrlParser: true})
        .then(client => Promise.resolve (connection = client.db(process.env.PORT ? "heroku_tld6rz1j" : "Convertwatch")))
        .catch(err => {
            console.log("There was an error connecting to the database");
            send_problem_notification("There was an error connecting to the database");
            return Promise.reject(err)
        })
    }
}




module.exports = {
    connect
}