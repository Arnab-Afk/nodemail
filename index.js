const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT||10000;

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

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
      to: 'newsletterastravant@gmail.com',
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

// Endpoint to send contact form data to admin
app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  if (!firstName ||!lastName ||!email ||!phoneNumber ||!message) {
    return res.status(400).send('All fields are required');
  }

  // Setup email data for the admin
  const mailOptionsForAdmin = {
    from: 'newsletterastravant@gmail.com',
    to: 'newsletterastravant@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Message: ${message}
    `
  };

  // Send notification email to the admin
  transporter.sendMail(mailOptionsForAdmin, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    // Setup email data for the user
    const mailOptionsForUser = {
      from: 'newsletterastravant@gmail.com',
      to: email,
      subject: 'Contact Form Submission Confirmation',
      text: 'Thank you for reaching out to us. We will get back to you soon.'
    };

    // Send confirmation email to the user
    transporter.sendMail(mailOptionsForUser, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }

      res.status(200).send('Contact form submission successful and admin notified');
    });
  });
});


app.post('/proplistban', (req, res) => {
  const { firstName, lastName, email, propertyLocation, propertyAcres, numberOfBHK, googleMapsLink, expectedSaleAndRent, query, description, parking } = req.body;
  
  if (!firstName || !lastName || !email || !propertyLocation || !propertyAcres || !numberOfBHK || !googleMapsLink || !expectedSaleAndRent || !query || !description || !parking) {
    return res.status(400).send('All fields are required');
  }
  
  // Setup email data for the admin
  const mailOptionsForAdmin = {
    from: 'newsletterastravant@gmail.com',
    to: 'newsletterastravant@gmail.com',
    subject: 'New Property Listing',
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Property Location: ${propertyLocation}
      Property Acres: ${propertyAcres}
      Number of BHK: ${numberOfBHK}
      Google Maps Link: ${googleMapsLink}
      Expected Sale and Rent: ${expectedSaleAndRent}
      Query: ${query}
      Description: ${description}
      Parking: ${parking}
    `
  };
  
  // Send notification email to the admin
  transporter.sendMail(mailOptionsForAdmin, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    
    // Setup email data for the user
    const mailOptionsForUser = {
      from: 'newsletterastravant@gmail.com',
      to: email,
      subject: 'Property Listing Submission Confirmation',
      text: 'Thank you for listing your property with us. We will get back to you soon.'
    };
    
    // Send confirmation email to the user
    transporter.sendMail(mailOptionsForUser, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Property listing submission successful and admin notified');
    });
  });
});



app.post('/query', (req, res) => {
    const { firstName, lastName, email, query, description } = req.body;
  
    if (!firstName || !lastName || !email || !query || !description) {
      return res.status(400).send('All fields are required');
    }
  
    // Setup email data for the admin
    const mailOptionsForAdmin = {
      from: 'newsletterastravant@gmail.com',
      to: 'newsletterastravant@gmail.com',
      subject: 'New Query Form Submission',
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Headline: ${query}
        Message: ${description}
      `
    };
  
    // Send notification email to the admin
    transporter.sendMail(mailOptionsForAdmin, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
  
      // Setup email data for the user
      const mailOptionsForUser = {
        from: 'newsletterastravant@gmail.com',
        to: email,
        subject: 'Query Form Submission Confirmation',
        text: 'Thank you for reaching out to us. We will get back to you soon.'
      };
  
      // Send confirmation email to the user
      transporter.sendMail(mailOptionsForUser, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
  
        res.status(200).send('Query form submission successful and admin notified');
      });
    });
  });


app.post('/property-inquiry', (req, res) => {
    const { firstName, lastName, phoneNumber, propertyRequirements, budgetRange } = req.body;
  
    if (!firstName ||!lastName ||!phoneNumber ||!propertyRequirements ||!budgetRange) {
      return res.status(400).send('All fields are required');
    }
  
    // Setup email data for the admin
    const mailOptionsForAdmin = {
      from: 'newsletterastravant@gmail.com',
      to: 'newsletterastravant@gmail.com',
      subject: 'New Property Inquiry',
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Phone Number: ${phoneNumber}
        Property Requirements: ${propertyRequirements}
        Budget: ${budgetRange}
      `
    };
  
    // Send notification email to the admin
    transporter.sendMail(mailOptionsForAdmin, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
  
      res.status(200).send('Property inquiry submission successful and admin notified');
    });
  });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
