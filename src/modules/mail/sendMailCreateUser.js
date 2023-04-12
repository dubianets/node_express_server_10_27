import sendEmailViaAwsSes from './sesClient';

export default async function sendMailCreateUser({
  email,
  emailHashConfirmation,
  userId,
}) {
  const host = process.env.CLIENT_HOST;
  const link = `${host}/user/verify/email/${userId}/${emailHashConfirmation}`;
  const subject = '[ClientBase] Verify your email';
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const message = {
    html: `Hi ${email},<br/>
          You registered at <a href=${host}>${host}</a>
          <br/><br/>
          Please, verify your email address <a href=${link}>click here</a>
          <br/><br/>
          Thanks,<br/>
          Your friends at ClientBase`,
    text: `Hi ${email},\nYou registered at King County Movers\n\nPlease, verify your email address click the link below\n${link}\n\nThanks,\nYour friends at ClientBase`,
  };
  return sendEmailViaAwsSes(email, subject, message);
}
