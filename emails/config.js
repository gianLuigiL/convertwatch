const transport_config = {
    host: "smtp.ionos.co.uk",
    port: "465",
    secure: true,
    auth: {
        user: "hello@convertwatch.com",
        pass: "Roodnepoym.23041993"
    }
}

const base_mail_options = {
    from: '"Convertwatch" <hello@convertwatch.com>',
    to: '',
    subject: '',
    html: '',
}

module.exports = {
    transport_config,
    base_mail_options
}