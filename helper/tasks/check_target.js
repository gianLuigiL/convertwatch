/**
 * Takes an array of documents to check against the latest rates and returns the documents that reached their target
 * @param {Object[]} documents - An array of documents to be scanned 
 * @param {Object} rates - An object with properties representing each currency and for every currency each relative rate against the others 
 */

const check_target = (documents, rates) => {
    return documents.filter(el => rates[el.initial_currency][target_currency] >= el.margin);
}

module.exports = {
    check_target
}