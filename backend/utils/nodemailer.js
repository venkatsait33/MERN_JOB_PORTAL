import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
    },
})

export default transporter