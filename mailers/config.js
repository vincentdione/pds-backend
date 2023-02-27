const nodemailer = require("nodemailer");
const Email = require("email-templates");
var ejs = require("ejs");

/* let transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: process.env.GMAIL_USESSL,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD, 
    },
  });
 */

  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'dioneousmanevincent@gmail.com',
      pass: 'ifmqexmljhmwctcw', 
    }
  };

  let transporter = nodemailer.createTransport(smtpConfig);
/* 
  {
    address:'smtp.gmail.com',
    port:587,
    domain:'gmail.com',
    user_name:'dioneousmanevincent@gmail.com',
    password:'WQ!12Ouzfatimalick',
    authentication:'plain'
    } */


const email = new Email({
      views: { 
        root: "email_templates",
      options: { extension: "ejs"},
    },
    message: {
      from: 'VIDEKO'
    },
    send: true,
    transport: transporter
});

module.exports = {    
  email,
};