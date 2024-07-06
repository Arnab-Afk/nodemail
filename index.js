const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 10000;

app.use(bodyParser.json());

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'yahoo', 'hotmail', etc.
    auth: {
        user: 'newsletterastravant@gmail.com',
        pass: 'lvykctgdtdozlpcg'
    }
});

// Endpoint to subscribe a user
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    // Setup email data for the recipient
    const mailOptionsForRecipient = {
        from: 'newsletterastravant@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        html: '<b>Thanks for subscribing to NewsLetter</b></br> <p>Astravant Realty</p>'
    };

    // Send confirmation email to the recipient
    transporter.sendMail(mailOptionsForRecipient, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        // Setup email data for the admin
        const mailOptionsForAdmin = {
            from: 'newsletterastravant@gmail.com',
            to: 'arnab.b@somaiya.edu',
            subject: 'New Subscription',
            text: `New user ${email} subscribed to the newsletter`
        };

        // Send notification email to the admin
        transporter.sendMail(mailOptionsForAdmin, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }

            res.status(200).send('Subscription confirmed and admin notified');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
