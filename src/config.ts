const {
    PORT: port = 3000,
    RESEND_API_KEY: resendApiKey = '',
} = process.env


module.exports = {
    config: {
        port,
        resendApiKey,
    }
}