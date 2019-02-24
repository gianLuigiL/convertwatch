//Filtering function
const { pick } = require("lodash");

//Get only the allowed currencies to avoid overhead
const allowed_currencies_details = require("../client/src/currencies/currencies_details");
const allowed_currencies = allowed_currencies_details.map(el => el.symbol);


const getRatios = (eur_based_ratios) => {
    const filtered = pick(eur_based_ratios, allowed_currencies)
    //Create base data with default set and add 1:1 ratio with base
    let ratios = { ...filtered };

    //Iterate on every currency and again iterate to get the relative ratio
    //rates is an array of array with names and value relative to 1 eur [[CAD, 1.5][AUD, 1.6]]
    let unsorted_rates = Object.entries(ratios);

    //Sort rates
    const sorted_rates = unsorted_rates.sort((a,b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));

    //Loop the first time to create an object ratio as { currency: {...relative_conversions} }
    sorted_rates.forEach( currency_arr => {
        let ratio = {};
        //Loop a second time to fill in the relative conversions
        sorted_rates.forEach( currency_to_map => {

            //Ratio is set like {base_curr: {curr: relative_value, curr2: relative_value}}
            ratio[currency_arr[0]] = {...ratio[currency_arr[0]], ...{ [currency_to_map[0]]: (currency_to_map[1] / currency_arr[1]).toFixed(4) }}
        })
        ratios = {...ratios, ...ratio};
    })
    return ratios;
}

const processHistoricalRatios = (entries) => {
    let historical_rates = [];
    //Create for every entry create ratio EUR = 1, the base of the records is in facts eur
    for(const date in entries.rates) {
        //Add the base eur 1:1 entry since the ratios are eur based and filter the currencies that are not allowed
        const filtered = pick({...entries.rates[date], EUR: 1 }, allowed_currencies)
        historical_rates = [...historical_rates, ...[{date, ratios: getRatios(filtered)}] ];
    }
    return historical_rates;
}

module.exports = {
    getRatios, processHistoricalRatios
}