const nodemailer = require('nodemailer');

/**
 * @param email
 */
async function main(email) {
  if (!email) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3',
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: 'info@moviese.at',
      pass: 'Fs.jizuX63er^Gq',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail(email);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

module.exports = {main};
