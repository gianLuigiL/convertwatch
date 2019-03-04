const nodemailer = require("nodemailer");
const { transport_config, base_mail } = require("../../emails/config");
const { email_expired_html, email_target_reached_html } = require("../../emails/emails");

/**
 * Takes an array of documents and send an email to the email saved in their "email property"
 * @param {Object[]} documents - An array of documents to whom send the email
 * @param {String} subject - The subject of the email
 * @param {String} body_html - The body in HTML of the email
 * 
 */
const send_emails = (documents, subject, body) => {

    const transporter = nodemailer.createTransport(transport_config);

    return documents.map(el => {
        let body_custom = body;

       body_custom = body_custom.replace("[INITIAL_CURRENCY]", el.initial_currency);
       body_custom = body_custom.replace("[TARGET_CURRENCY]", el.target_currency);
       body_custom = body_custom.replace("[MARGIN_VALUE]", (+el.margin_value).toFixed(4));

        const mailOptions = {
            ...base_mail,
            to: el.email,
            subject: subject,
            html: body_custom,
        }

        return transporter.sendMail(mailOptions)
        .then(info => {
            if(info.rejected && info.rejected.length) {
                console.log("Email rejected for " + el);
            }

            return Promise.resolve(true)
        })
        .catch(err => {
            if(err){
                console.log(err);
            }
        });
    })
}

const send_expired = (documents) => {
    return send_emails(documents, "ConverWatch, your entry has expired.", email_expired_html);
}


const send_target_reached = (documents) => {
    return send_emails(documents, "ConverWatch, you have reached your goal!", email_target_reached_html);
}

const send_crash_alert = () => {
    return send_emails([{email: "hello@convertwatch.com"}], "Node has crashed at Convertwatch", "Node crashed");
}

const send_problem_notification = (body) => {
    return send_emails([{email: "hello@convertwatch.com"}], "There was a problem at ConvertWatch", body)[0];
}

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