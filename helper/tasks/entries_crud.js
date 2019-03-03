const fetch = require("node-fetch");
const  { connect } = require("../../config/db_connect");
const { send_problem_notification } = require("./send_email");


const get_entry = async (document) => {
    let db;
    try {
        db = await connect()
    } catch (error) {
        console.log(`There was a problem connecting to the database in "get_entry"`);
        send_problem_notification(`There was a problem connecting to the database in "get_entry"`);
        return false;
    }
    return db.collection("entries").find(document).toArray()
    .then(results => results)
    .catch(err => {
        console.log(`There was a problem retrieving an entry in "get_entry"`, err);
        send_problem_notification(`There was a problem retrieving an entry in "get_entry"`);
        return false;
    });
}

const get_all_entries = async () => {
    let db;
    try {
        db = await connect()
    } catch (error) {
        console.log(`There was a problem connecting to the database in "get_all_entries"`);
        send_problem_notification(`There was a problem connecting to the database in "get_all_entries"`);
        return false;
    }
    return db.collection("entries").find({}).toArray()
    .then(results => results)
    .catch(err => {
        console.log(`There was a problem retrieving an entry in "get_all_entries"`, err);
        send_problem_notification(`There was a problem retrieving an entry in "get_all_entries"`);
        return false;
    });
};

const delete_entry = async (document) => {
    let db;
    try {
        db = await connect()
    } catch (error) {
        console.log(`There was a problem connecting to the database in "delete_entry"`);
        send_problem_notification(`There was a problem connecting to the database in "delete_entry"`);
        return false;
    }
    return db.collection("entries").deleteOne(document)
    .then(results => results)
    .catch(err => {
        console.log(`There was a problem retrieving an entry in "delete_entry"`, err);
        send_problem_notification(`There was a problem retrieving an entry in "delete_entry"`);
        return false;
    });
}

const delete_entries = async (documents) => {
    const deleted = documents.map(el => delete_entry(el));
    Promise.all(deleted).then(deleted => {
        console.log(`${deleted.length} have been deleted.`);
        send_problem_notification(`${deleted.length} have been deleted.`);
        return true;
    })
    .catch(err => {
        console.log(`There was a problem deleting entries in "delete_entries"`, err);
        send_problem_notification(`There was a problem deleting entries in "delete_entries"`);
        return false;
    })
}


module.exports = {
    get_entry,
    get_all_entries,
    delete_entry,
    delete_entries
}