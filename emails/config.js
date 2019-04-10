const transport_config = {
    host: "smtp.ionos.co.uk",
    port: "587",
    secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
        user: "hello@convertwatch.com",
        pass: "Q2EPmXp.3CiH_S5"
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