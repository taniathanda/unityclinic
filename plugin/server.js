const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tania.thandar@gmail.com',
        pass: 'Tania@540774'
    }
});

app.post('/send-email', (req, res) => {
    const { date, timeSlot, userEmail } = req.body;

    const mailOptions = {
        from: 'tania.thandar@gmail.com',
        to: userEmail, // Use the user's email as the recipient
        subject: 'Booking Confirmation',
        text: `A new booking has been made:\nDate: ${date}\nTime Slot: ${timeSlot}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Booking confirmed and email sent!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
