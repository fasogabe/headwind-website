const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
require('dotenv').config();

const app = express();

// Contact form submission email recipients
const address1 = process.env.HEADWIND_EMAIL_1;
const address2 = process.env.HEADWIND_EMAIL_TEST;
const address3 = null;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
  res.render('pages/index', { page_name: 'home' });
});

// Projects page
app.get('/projects', (req, res) => {
  res.render('pages/projects', { page_name: 'projects' });
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('pages/contact', { page_name: 'contact' });
});

// Mailgun
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_API_URL,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// Send email from contact form
app.post('/send', (req, res) => {
  // Parse mail info
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, (err, fields) => {
    console.log(fields);
    Object.keys(fields).forEach((val) => {
      data[val] = fields[val].toString();
    });

    // Specify email format
    const mail = {
      from: { name: data.name, address: data.email },
      to: [address1, address2],
      subject: `New message from ${data.name}`,
      text: data.message,
    };

    // Send email
    nodemailerMailgun.sendMail(mail, (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ success: false });
      } else {
        console.log(`Email sent successfully!\nResponse: ${info}`);
        res.status(200).json({ success: true });
      }
    });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
