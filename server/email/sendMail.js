const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * @param email
 */
async function main(email) {
  if (!email) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.PROD_MAIL_HOST || 'localhost',
    secure: process.env.PROD_MAIL_SECURE || false,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3',
    },
    requireTLS: process.env.PROD_REQUIRE_TLS || false,
    port: 465,
    logger: true,
    debug: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail(email);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);

module.exports = {main};
