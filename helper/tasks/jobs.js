//Dependency to actually trigger the cron jobs
const cron = require("node-cron");
//Database hook
const { connect } = require("../../config/db_connect");
//Helper functions
const { check_target } = require("./check_target"); 
const { send_target_reached, send_expired, send_problem_notification, send_notification } = require("./send_email");
const entries = require("./entries_crud");
const historical_rates = require("./historical_rates_crud");

/**
 * Send emails to entries that have reached their target every day at 15:45:00 GMT or 16:45:00 CET (the API updates at 16:00 CET).
 * @returns {undefined}
 */
const email_achieved_target = async () => {
    //Get connection
    let db;
    try {
        db = await connect();
    } catch (error) {
        console.log(err);
        send_problem_notification(`There was a problem connecting to the database in "email_achieved_target"`);
        return false;
    }
    //Schedule for 16:45 GMT
    cron.schedule("00 45 16 * * *", async function () {
        //Get all the entries in the DB
        const all_entries = await entries.get_all_entries();
        //Delete today rates so that there are no possible duplicates
        historical_rates.delete_today_rates()
        .then(success => {
            if (success) {
                //Recreate todays entry in the DB
                historical_rates.create_latest()
                .then(success => {
                    //Get todays entry from the DB. The API is a goodwill one, this extra step is to avoid being greedy.
                    historical_rates.get_latest_rate()
                    .then(latest_rates => {
                        //When it gets the latest entries check who has achieved the target
                        const entries_who_achieved = check_target(all_entries, latest_rates.rates);
                         //Send an email to the ones who achieved tehir target
                        send_target_reached(entries_who_achieved)
                        .then(success => {
                            //Delete those same entries who achieved. The service is a one time deal.
                            entries.delete_entries(entries_who_achieved)
                            .then(success => {
                                //Send a notification When the job finishes
                                send_notification(`Todays routine has finished checking how many entries have achieved their target`, `${entries_who_achieved.length} entries achieved their target today.`);
                            })
                        })
                        
                    } )
                    .catch(err => {
                        console.log(`There was a problem getting today's entry in scheduled task "get_latest_rate"`,err);
                        send_problem_notification(`There was a problem getting today's entry in scheduled task "get_latest_rate"`);
                        })
                })
                .catch(err => {
                    console.log(`There was a problem deleting todays entry in scheduled task "create_latest"`,err);
                    send_problem_notification(`There was a problem deleting todays entry in scheduled task "create_latest"`);
                        })
            }
        })
        .catch(err => {
            console.log(`There was a problem deleting todays entry in scheduled task "delete_today_rates"`,err);
            send_problem_notification(`There was a problem deleting todays entry in scheduled task "delete_today_rates"`);
            })
    });
}

/**
 * Check entries that are older than 6 months and notify removal to the user, then remove the entry.
 * @returns {undefined}
 */
const check_expired_entries = () => {
    cron.schedule("00 00 17 * * *", async function () {
        const all_entries = await entries.get_all_entries();
        //Decode timestamp from the id and check against a timestamp of six months ago
        const old_entries = all_entries.filter(el => el._id.getTimestamp().getTime() < (new Date().getTime() - (1000 * 60 * 60 * 24 * 30 * 6)));
        //Alert user
        Promise.all([send_expired(old_entries)])
        .then(results => {
            //Then delete the entries
            entries.delete_entries(old_entries).then(results => {
                if(results !== true) {
                    send_problem_notification("Something happened while deleting old entries @ cron job in 'check_expired_entries'")
                } else {
                    send_notification("The routine deletion of old entries has completed", `There were ${old_entries.length} old entries in the databse that have been removed`);
                }
            })
        })
    });
};  


module.exports = {
    email_achieved_target,
    check_expired_entries
}