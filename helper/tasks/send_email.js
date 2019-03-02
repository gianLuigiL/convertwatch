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

    const email_addresses = documents.map(el => el.email);
    console.log(email_addresses);
    return email_addresses.map(el => {
        const mailOptions = {
            ...base_mail,
            to: el,
            subject: subject,
            html: body,
        }

        return transporter.sendMail(mailOptions)
        .then(info => {
            if(info.rejected && info.rejected.length) {
                console.log("Email rejected for " + el);
            }
            console.log("OK")

            return Promise.resolve(info)
        })
        .catch(err => {
            if(err){
                console.log(err);
            }
        });
    })
}

const send_expired = (documents) => {
    return send_emails(documents, "ConverWatch, your entry has expired.", email_expired);
}


const send_target_reached = (documents) => {
    return send_emails(documents, "ConverWatch, you have reached your goal!", email_target_reached_html);
}

const send_crash_alert = () => {
    return send_emails([{email: "hello@convertwatch.com"}], "Node has crashed at Convertwatch", "Node crashed");
}

const send_problem_notification = (description) => {
    return send_emails([{email: "hello@convertwatch.com"}], "There was a problem at ConvertWatch", description)[0];
}

module.exports = {
    send_expired,
    send_target_reached,
    send_crash_alert,
    send_problem_notification
}