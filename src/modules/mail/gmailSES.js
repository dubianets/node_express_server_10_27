import message from '../utils/messages';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '20982571951-m2h4sf8h9gpoll0lfg396t6j9obn1i0h.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04VhXYFJC2rJQCgYIARAAGAQSNwF-L9IrRS9MRafOAQdLakYuVJpbbX-nqH2NvuzP2o7XST2vxRoi7Cp2DmbDROhtUOnm2Xeioxg';
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
