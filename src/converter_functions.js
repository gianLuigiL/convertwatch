export const getRatios = (currencies) => {
    //Create base data with default set and add 1:1 ratio with base
    let ratios = { EUR: {...currencies.rates, EUR: 1 } };

    //Iterate on every currency and again iterate to get the relative ratio
    //rates is an array of array with names and value relative to 1 eur [[CAD, 1.5][AUD, 1.6]]
    let unsorted_rates = Object.entries(currencies.rates);
    unsorted_rates.push(["EUR", 1]);
    //Sort rates
    const sorted_rates = unsorted_rates.sort((a,b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));

    sorted_rates.forEach( currency_arr => {
        let ratio = {};

        sorted_rates.forEach( currency_to_map => {

            //Ratio is set like {base_curr: {curr: relative_value, curr2: relative_value}}
            ratio[currency_arr[0]] = {...ratio[currency_arr[0]], ...{ [currency_to_map[0]]: (currency_to_map[1] / currency_arr[1]).toFixed(4) }}
        })
        ratios = {...ratios, ...ratio};
    })
    return ratios;
}