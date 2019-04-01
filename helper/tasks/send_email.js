//The dependency to actually send emails
const nodemailer = require("nodemailer");
//SMTP config and base mail config
const { transport_config, base_mail_options } = require("../../emails/config");
//Templates for emails
const { email_expired_html, email_target_reached_html } = require("../../emails/emails");

/**
 * Takes an array of documents and send an email to the email saved in their "email" property.
 * @param {Object[]} documents - An array of documents to whom send the email.
 * @param {String} subject - The subject of the email.
 * @param {String} body_html - The body in HTML of the email.
 * @returns {Promise<any[]>} An array of promises for every email sent.
 */

const send_emails = (documents, subject, body) => {
    //Use STMP as config
    const transporter = nodemailer.createTransport(transport_config);
    //Returns an array of Promises of sent emails.
    return documents.map(el => {
        let body_custom = body;
        //Replaces placeholders in templates with the actual values from the documents.
        body_custom = body_custom.replace("[INITIAL_CURRENCY]", el.initial_currency);
        body_custom = body_custom.replace("[TARGET_CURRENCY]", el.target_currency);
        body_custom = body_custom.replace("[MARGIN_VALUE]", (+el.margin_value).toFixed(4));
        //Use base mail but replace some fields with the correct values
        const mailOptions = {
            ...base_mail_options,
            to: el.email,
            subject: subject,
            html: body_custom,
        }
        //Send mail using the options created
        return transporter.sendMail(mailOptions)
        .then(info => {
            if(info.rejected && info.rejected.length) {
                console.log("Email rejected for " + el);
            }
            //If everything goes ok resolve to boolean 
            return Promise.resolve(true)
        })
        .catch(err => {
            if(err){
                console.log(err);
                send_problem_notification("There was an error sending emails @ send_email.js in 'send_emails'");
            }
        });
    })
}

/**
 * Send to an array of documents a template email to notify expiration has passed.
 * @param {any[]} documents 
 * @returns {Promise<any[]>} Array of Promises of sent emails
 */
const send_expired = async (documents) => {
    return send_emails(documents, "ConverWatch, your entry has expired.", email_expired_html);
}

/**
 * Send to an array of documents a template email to notify they reached their target.
 * @param {any[]} documents 
 * @returns {Promise<any[]>} Array of Promises of sent emails
 */
const send_target_reached = async (documents) => {
    return send_emails(documents, "ConverWatch, you have reached your goal!", email_target_reached_html);
}

/**
 * Send a crash alert email.
 * @returns {Promise<any[]>} Array with a single entry for the sent email.
 */
const send_crash_alert = async () => {
    return send_emails([{email: "hello@convertwatch.com"}], "Node has crashed at Convertwatch", "Node crashed");
}

/**
 * Send a notification of a problem with template fields.
 * @param {string} body The HTML body of the email.
 * @returns {Promise<any[]>} Array with a single entry for the sent email.
 */
const send_problem_notification = (body) => {
    return send_emails([{email: "hello@convertwatch.com"}], "There was a problem at ConvertWatch", body)[0];
}

/**
 * Send a notification to admin email.
 * @param {string} subject Subject of the email.
 * @param {string} body The HTML body of the email.
 * @returns {Promise<any[]>} Array with a single entry for the sent email about the crash.
 */
const send_notification = (subject, body) => {
    return send_emails([{email: "hello@convertwatch.com"}], subject, body)[0];
}

module.exports = {
    send_expired,
    send_target_reached,
    send_crash_alert,
    send_problem_notification,
    send_notification
}