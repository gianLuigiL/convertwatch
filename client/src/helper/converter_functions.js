//Filtering function
import { pick } from "lodash"

//Get only the allowed currencies to avoid overhead
import allowed_currencies_details from "../currencies/currencies_details";
const allowed_currencies = allowed_currencies_details.map(el => el.symbol);

/**
 * Converts eur based rates in the shape of {AUD: 1.1234, USD: 1.2548} into relative ratios in every base currency. 
 * @param {any} EUR_based_rates
 * @returns {any} Relative rates in every base currency.
 */
export const get_rates = (eur_based_rates) => {
    //Extract an obejct with the rates of the allowed currencies
    const filtered = pick(eur_based_rates, allowed_currencies)
    //Copy to avoid side effects
    let rates = { ...filtered };

    //Rates is an array of array with names and value relative to 1 eur [[CAD, 1.5][AUD, 1.6]]
    let unsorted_rates = Object.entries(rates);

    //Sort rates in ascendendent order
    const sorted_rates = unsorted_rates.sort((a,b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));

    //Iterate on every currency and again iterate to get the relative rate
    //Loop the first time to create an object rate as { EUR: {...relative_conversions} }
    sorted_rates.forEach( currency_arr => {
        let rate = {};
        //Loop a second time to fill in the relative conversions
        sorted_rates.forEach( currency_to_map => {

            //Rate is set like {EUR: {AUD: 1.2355, CAD: 1.4444, ... }, AUD: {...}}
            //Note currency_arr is the outer iteration and currency_to_map the inner iteration
            rate[currency_arr[0]] = {...rate[currency_arr[0]], ...{ [currency_to_map[0]]: (currency_to_map[1] / currency_arr[1]) }}
        })
        //Iterate to evoid side effects
        rates = {...rates, ...rate};
    })
    return rates;
}

/**
 * Accept an object {rates: {YYYY-MM-DD: {AUD: 1.2345}}} and returns an array of documents with a date property and rates set in every base.
 * @param {any} entries Base object from the API.
 * @returns {any[]} An array of documents {date: YYYY-MM-DD, rates: {AUD: {...}, CAD: {...}}}.
 */
export const process_historical_rates = (entries) => {
    let historical_rates = [];
    //Create for every entry create ratio EUR = 1, the base of the records is in facts eur
    for(const date in entries.rates) {
        //Add the base eur 1:1 entry since the ratios are EUR based and filter the currencies that are not allowed
        const filtered = pick({...entries.rates[date], EUR: 1 }, allowed_currencies)
        historical_rates = [...historical_rates, {date, rates: get_rates(filtered)} ];
    }
    return historical_rates;
}