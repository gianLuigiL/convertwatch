const cron = require("node-cron");
const { send_target_reached } = require("./send_email");
const { connect } = require("../../config/db_connect");
const entries = require("./entries_crud");
const historical_rates = require("./historical_rates_crud");
const { check_target } = require("./check_target"); 

const email_achieved_target = async () => {
    let db;
    try {
        db = await connect();
    } catch (error) {
        console.log(err);
        send_problem_notification(`There was a problem connecting to the database in "email_achieved_target"`);
        return false;

    }

    cron.schedule("0 30 16 * * *", async function () {
        const all_entries = await entries.get_all_entries();
        historical_rates.delete_today_rates()
        .then(success => {
            if (success) {
                historical_rates.create_latest()
                .then(success => {
                    historical_rates.get_latest_rate()
                    .then(latest_rates => {
                        const entries_who_achieved = check_target(all_entries, latest_rates.ratios);
                        send_target_reached(entries_who_achieved);
                    })
                    .catch(err => {
                        console.log(`There was a problem getting today's entry in scheduled task "get_latest_rate"`,err);
                        send_problem_notification(`There was a problem getting today's entry in scheduled task "get_latest_rate"`);
                        return false;
                        })
                })
                .catch(err => {
                    console.log(`There was a problem deleting todays entry in scheduled task "create_latest"`,err);
                    send_problem_notification(`There was a problem deleting todays entry in scheduled task "create_latest"`);
                    return false;
                        })
            }
        })
        .catch(err => {
            console.log(`There was a problem deleting todays entry in scheduled task "delete_today_rates"`,err);
            send_problem_notification(`There was a problem deleting todays entry in scheduled task "delete_today_rates"`);
            return false;
            })

    });
}

module.exports = {
    email_achieved_target
}