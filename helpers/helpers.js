require("dotenv").config();
const nodemailer = require("nodemailer");

const { SMTP_SENDER, SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } =
    process.env;

function tryCatchWrapper(enpointFn) {
    return async (req, res, next) => {
        try {
            await enpointFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    };
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

async function sendMail({ to, html, subject }) {
    const email = {
        from: SMTP_SENDER,
        to,
        subject,
        html,
    };

    const transport = nodemailer.createTransport({
        host: SMTP_SERVER,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
    });

    await transport.sendMail(email);
}

module.exports = {
    tryCatchWrapper,
    ValidationError,
    sendMail,
};
