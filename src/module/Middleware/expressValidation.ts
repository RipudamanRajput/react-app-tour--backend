import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

export const handleInputErrors = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400)
        res.json({ error: error.array() });
    } else {
        next()
    }
}

export const mailer = (req, res) => {
    try {
        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_GMAIL,
                pass: process.env.ADMIN_GMAILPASS
            }
        });

        var mailOptions = {
            from: process.env.ADMIN_GMAIL,
            to: req.body.email,
            subject: "test email",
            text: "text to check email?"
        };

        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.json({ error: err })
            } else {
                res.json({ data: info.response })
            }
        })
    } catch (error) {
        res.json({ error, result: false })
    }

}