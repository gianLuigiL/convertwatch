const get_today_time = () => new Date().getTime();

const get_today_string = () => `${get_current_year}-${get_current_month}-${get_current_day_of_month}`;

const get_current_year_string = () => new Date().getFullYear();

const get_current_month_string = () => (new Date().getMonth() + 1).toString().padStart(2, "0");

const get_current_day_of_month_string = () => new Date().getDate().toString().padStart(2, "0");

const get_six_months_ago_time = () => get_today_time - (1000 * 60 * 60 * 24 * 30 * 6);

const get_six_months_ago_date = () => new Date(get_six_months_ago_time);

const get_six_months_ago_string = () => `${get_six_months_ago_year_string()}-${get_six_months_ago_month_string()}-${get_six_months_ago_day_of_month_string()}`;

const get_six_months_ago_year_string = () => get_six_months_ago_date.getFullYear();

const get_six_months_ago_month_string = () => (get_six_months_ago_date.getMonth() + 1).toString().padStart(2, "0")

const get_six_months_ago_day_of_month_string = () => (get_six_months_ago_date.getDate() + 0).toString().padStart(2, "0")

module.exports = {
    get_today_time,
    get_today_string,
    get_current_year_string,
    get_current_month_string,
    get_current_day_of_month_string,
    get_six_months_ago_time,
    get_six_months_ago_date,
    get_six_months_ago_string,
    get_six_months_ago_year_string,
    get_six_months_ago_month_string,
    get_six_months_ago_day_of_month_string
}