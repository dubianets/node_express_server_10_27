import message from '../utils/messages';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async function gmailSendMail(email, subject, messageText) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'kingcountymoversllc@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOption = {
      from: 'kingcountymoversllc@gmail.com',
      to: email,
      subject: subject,
      text: messageText.text,
      html: messageText.html,
    };
    const result = await transport.sendMail(mailOption);
    return message.success('Email is sent', result);
  } catch (error) {
    return message.fail('Email is not sent', error);
  }
}

// gmailSendMail()
//   .then((result) => {
//     console.log(result);
//     return message.success('Email is sent', result);
//   })
//   .catch((error) => {
//     return message.fail('Email is not sent', error);
//   });
