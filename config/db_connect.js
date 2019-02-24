let database = "";

if(process.env.PORT) {
    database = "mongodb://gianluigi:R4g2W9HAwN55S2x@ds139435.mlab.com:39435/heroku_tld6rz1j";
} else {
    database = "mongodb://localhost:27017/Convertwatch";
}

module.exports = {
    database
}