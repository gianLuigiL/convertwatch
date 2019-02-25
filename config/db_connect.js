let database = "";

 if(process.env.PORT) {
    database = "mongodb://heroku_tld6rz1j:62h46paeuqh4g3hi7h2erlpe0c@ds139435.mlab.com:39435/heroku_tld6rz1j";
} else {
    database = "mongodb://localhost:27017/Convertwatch";
}

module.exports = {
    database
}