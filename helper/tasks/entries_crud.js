//Database hook
const  { connect } = require("../../config/db_connect");
//Send email on problems
const { send_problem_notification, send_notification } = require("./send_email");

/**
 * Get a single document matching the passed one.
 * @param {any} document Object used to retrieve matching documents.
 * @returns {Promise<any>} Document matching the one passed.
 */
const get_entry = async (document) => {
    //Get connection
    let db;
    try {
        db = await connect()
    } catch (error) {
        console.log(`There was a problem connecting to the database @ entries_crud.js in "get_entry"`);
        send_problem_notification(`There was a problem connecting to the database @ entries_crud.js in "get_entry"`);
        return false;
    }
    //Return a Promise of a document
    return db.collection("entries").findOne(document)
    .catch(err => {
        console.log(`There was a problem retrieving an entry @ entries_crud.js in "get_entry"`, err);
        send_problem_notification(`There was a problem retrieving an entry @ entries_crud.js in "get_entry"`);
        return false;
    });
}

/**
 * Get a all the documents matching the passed one.
 * @param {any} document Object used to retrieve matching documents.
 * @returns {Promise<any[]>} Promise that resolves to an array of the matched documents.
 */
const get_entries = async (document) => {
    //Get connection
    let db;
    try {
        db = await connect()
    } catch (error) {
        console.log(`There was a problem connecting to the database @ entries_crud.js in "get_entries"`);
        send_problem_notification(`There was a problem connecting to the database @ entries_crud.js in "get_entries"`);
        return false;
    }
    //Return a promise of an array of documents
    return db.collection("entries").find(document).toArray()
    .catch(err => {
        console.log(`There was a problem retrieving entries @ entries_crud.js in "get_entries"`, err);
        send_problem_notification(`There was a problem retrieving entries @ entries_crud.js in "get_entries"`);
        return false;
    });
}

/**
 * Get every entry in the database
 */
const get_all_entries = async () => {
    //Match every document in the database
    return get_entries({});
};

/**
 * Returns a Promise that resolves to an object with a "deletedCount" property matching the documents affected.
 * @param {any} document The object to match against the documents.
 * @returns {Promise<any>} Promise that resolves to an object with a deletedCount property matching the affected documents.
 */
const delete_entry = async (document) => {
    //Get connection
    let db;
    try {
        db = await connect()
    } catch (error) {
        console.log(`There was a problem connecting to the database @ entries_crud.js in "delete_entry"`);
        send_problem_notification(`There was a problem connecting to the database @ entries_crud.js in "delete_entry"`);
        return false;
    }
    //Return a promise of an object with a deletedCount property
    return db.collection("entries").deleteOne(document)
    .catch(err => {
        console.log(`There was a problem retrieving an entry @ entries_crud.js in "delete_entry"`, err);
        send_problem_notification(`There was a problem retrieving an entry @ entries_crud.js in "delete_entry"`);
        return false;
    });
}

/**
 * Deletes avery document that matches the array of objects passed.
 * @param {any[]} documents An array of objects to match against the documents.
 * @returns {Promise<boolean>} A promise that resolves to true on success.
 */
const delete_entries = async (documents) => {
    //Creates an array of Promises
    const deleted = documents.map(el => delete_entry(el));
    //If there are no matched documents resolve
    if(deleted.length === 0) {
        return Promise.resolve(true);
    }
    //When every Promise has been settled
    Promise.all(deleted).then(deleted => {
        console.log(`${deleted.length} have been deleted.`);
        send_notification("Deleted entries in the database", `${deleted.length} entries have been deleted form the database`);
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
    get_entries,
    get_all_entries,
    delete_entry,
    delete_entries
}