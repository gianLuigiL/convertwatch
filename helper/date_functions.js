/**
 * Returns the number of milliseconds up to now.
 * @returns {number} Now in milliseconds.
 */
const get_today_time = () => new Date().getTime();

/**
 * Returns a string for today matching the pattern YYYY-MM-DD,
 * @returns {string} A string for today's date YYYY-MM-DD,
 */
const get_today_string = () => `${get_current_year_string()}-${get_current_month_string()}-${get_current_day_of_month_string()}`;

/**
 * Returns the current year YYYY
 * @returns {string} The current year as string - YYYY.
 */
const get_current_year_string = () => new Date().getFullYear();

/**
 * Returns the current month as a zero-led number 01-12.
 * @returns {string} A zero led string for current month number.
 */
const get_current_month_string = () => (new Date().getMonth() + 1).toString().padStart(2, "0");

/**
 * Returns the full name of the current month.
 * @returns {string} The full name of the current month.
 */
const get_current_month_name = () => {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return months[new Date().getMonth()];
}

/**
 * Returns the current day of the month as a zero-led number.
 * @returns {string} A zero led number as a string for the current day 01-31.
 */
const get_current_day_of_month_string = () => new Date().getDate().toString().padStart(2, "0");

/**
 * Returns yesterday's time at this same hour.
 * @returns {number} The number of milliseconds from epoch to yesterday at this same hour.
 */
const get_yesterday_time = () => get_today_time() - (1000 * 60 * 60 * 24);

/**
 * Returns a date obejct for yesterday at this same hour
 * @returns {Date} Date of yesterday at this same hour.
 */
const get_yesterday_date = () => new Date(get_yesterday_time());

/**
 * Returns a string for yesterday matching the pattern YYYY-MM-DD.
 * @returns {string} A string for yesterday's date YYYY-MM-DD.
 */
const get_yesterday_string = () => `${get_yesterday_year_string()}-${get_yesterday_month_string()}-${get_current_day_of_month_string()}`;

/**
 * Get yesterday's year as a string.
 * @returns {string} String representation of the year for yesterday.
 */
const get_yesterday_year_string = () => get_yesterday_date().getFullYear();

/**
 * Get yesterday's month as a zero led number.
 * @returns {string} String representation of the month for yesterday 01-31.
 */
const get_yesterday_month_string = () => (get_yesterday_date().getMonth() + 1).toString().padStart(2,"0");

/**
 * Returns the day of the month for yesterday as a zero-led number.
 * @returns {string} A zero led number as a string for yesterday's date 01-31.
 */
const get_yesterday_day_of_the_month_string = () => (get_yesterday_date().getDate()).toString().padStart(2,"0");

/**
 * Returns six months ago time at this same hour.
 * @returns {number} The number of milliseconds from epoch to six months ago at this same hour.
 */
const get_six_months_ago_time = () => get_today_time() - (1000 * 60 * 60 * 24 * 30 * 6);

/**
 * Returns a date obejct for six months ago at this same hour
 * @returns {Date} Date of six months ago at this same hour.
 */
const get_six_months_ago_date = () => new Date(get_six_months_ago_time());

/**
 * Returns a string for six months ago matching the pattern YYYY-MM-DD,
 * @returns {string} A string for six months ago's date YYYY-MM-DD,
 */
const get_six_months_ago_string = () => `${get_six_months_ago_year_string()}-${get_six_months_ago_month_string()}-${get_six_months_ago_day_of_month_string()}`;

/**
 * Get year for six months ago as a string - YYYY.
 * @returns {string} String representation of the year for six months ago - YYYY.
 */
const get_six_months_ago_year_string = () => get_six_months_ago_date().getFullYear();

/**
 * Returns the month for six months ago as a zero-led number.
 * @returns {string} A zero led number as a string for six months ago's month number 01-12.
 */
const get_six_months_ago_month_string = () => (get_six_months_ago_date().getMonth() + 1).toString().padStart(2, "0")

/**
 * Get yesterday's day of the month as a zero led number.
 * @returns {string} String representation of the day of the month for six months ago 01-31.
 */
const get_six_months_ago_day_of_month_string = () => (get_six_months_ago_date().getDate() + 0).toString().padStart(2, "0")

module.exports = {
    get_today_time,
    get_today_string,
    get_current_year_string,
    get_current_month_string,
    get_current_month_name,
    get_current_day_of_month_string,
    get_yesterday_date,
    get_yesterday_time,
    get_yesterday_string,
    get_yesterday_year_string,
    get_yesterday_month_string,
    get_yesterday_day_of_the_month_string,
    get_six_months_ago_time,
    get_six_months_ago_date,
    get_six_months_ago_string,
    get_six_months_ago_year_string,
    get_six_months_ago_month_string,
    get_six_months_ago_day_of_month_string
}