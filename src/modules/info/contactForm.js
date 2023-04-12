import gmailSendMail from '../mail/gmailSES';
import { get } from 'lodash';
import message from '../utils/messages';

export default async function ContactForm(req, res) {
  //const host = process.env.CLIENT_HOST;
  const name = get(req, 'body.name', '');
  const email = get(req, 'body.email', '').trim().toLowerCase();
  const phone = get(req, 'body.phone', '');
  const formMessage = get(req, 'body.message');
  const subject = 'King County Movers Request';
  const messaging = {
    html: `Hi dear ${name}<br/>
          Thank you for your request<br/>
          King County Movers team always glad to help you with any questions
          <br/><br/>
          <h3>We are working under your request</h3>
          Name: ${name},<br/>
          Email: ${email},<br/>
          Message: ${formMessage}<br/>
          <br/><br/>
          <h4>We will contact with you shortly!</h4> 
           <br/><br/>
           Please check information on our web site <a href= "Kingcountymoversllc.com">www.kingcountymoversllc.com</a>
           <br/><br/>
           If you have any questions, please feel free to contact us<br/>
           (206)451-9140
          <br/>
          Thanks,<br/>
          Your friends at King County Movers`,
    text: `Hi dear ${name}\nThank you for your request\n
    \nKing County Movers team always glad to help you with any questions\n
    \nWe are working under your request\n
    \nName: ${name}\n
    \nPhone number: ${phone}\n
    \nMessage: ${formMessage}\n
    \nWe will contact with you shortly!\n
    \nPlease check information on our web site www.kingcountymoversllc.com\n
    \nIf you have any questions, please feel free to contact us\n
    \n(206)451-9140\n
    \nThanks,\nYour friends at King County Movers`,
  };
  console.log(message);
  //return sendEmailViaAwsSes(email, subject, message);
  const sentRequest = await gmailSendMail(email, subject, messaging)
    .then((result) => {
      const analyticsId = {
        reason: get(sentRequest, 'payload.message'),
        email,
      };
      return res
        .status(201)
        .json(
          message.success(
            'Request sent successfully. Please check your email',
            analyticsId,
          ),
        );
    })
    .catch((error) => {
      const analyticsId = {
        reason: get(sentRequest, 'payload.message'),
        email,
      };
      return res.status(404).json(message.fail('Request was not send', analyticsId));
    });
}
