const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

GMAIL_USER = 'headwind.mailer@gmail.com';
GMAIL_PASS = 'pH5)Q9qsG@Ug}N>v';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/projects', (req, res) => {
  res.render('pages/projects');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.post('/send-email', (req, res) => {
  // Instantiate SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });

  // Specify email format
  const mailOpts = {
    from: 'headwind.mailer',
    to: 'omicronesta@gmail.com', // Temporary. add headwind emails thru dotenv
    subject: 'test',
    text: `Message from ${req.body.name} (${req.body.email}): \n\n ${req.body.message}`
  };

  // Send email
  smtpTrans.sendMail(mailOpts, (err, res) => {
    if (err) {
      console.log(err);
      res.render('pages/contact'); // Temporary. add error/success messages to view
    } else {
      console.log(res);
      res.render('pages/contact'); // Temporary. add error/success messages to view
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
