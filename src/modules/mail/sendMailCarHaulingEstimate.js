import gmailSendMail from './gmailSES';

export default async function sendMailCarHaulingEstimate({
  email,
  name,
  phone,
  pickUp,
  delivery,
  distance,
  type,
  mark,
  model,
  year,
  date,
  estimatePrice,
}) {
  //const host = process.env.CLIENT_HOST;
  const subject = 'King County Movers Car Hauling service Estimate';
  const message = {
    html: `<p><h3>${subject}</h3>
          Hi dear ${name}<br/>
          Thank you for your request<br/>
          King County Movers team always glad to help you with any questions</p>
          <br/>
          <h3>Here is your estimate</h3>
          Name: ${name},<br/>
          Phone number: ${phone}<br/>
          Pick-up address: ${pickUp}<br/>
          Delivery address: ${delivery}<br/>
          Distance: ${distance}<br/>
          Type of Vehicle: ${type}<br/>
          Mark of Vehicle: ${mark}<br/>
          Model of Vehicle: ${model}<br/>
          Year of Vehicle: ${year}<br/>
          Date: ${date}<br/>
          Estimate Price: ${estimatePrice}<br/>
          <br/><br/>
          <h4>Notice:</h4> 
           Be attention this is not a bill!<br/>
           This is not a guaranteed amount!<br/>
           The final price may effective on many factors
           <br/><br/>
           If you have any questions, please feel free to contact us<br/>
           (206)451-9140
          <br/>
          Or respond on this message<br/>
          <br/>
          Thanks,<br/>
          Your friends at King County Movers<br/>
          <img src = 'https://gcdnb.pbrd.co/images/cQTLfSIuqvga.jpg?o=1' alt = 'LOGO'/>`,
    text: `${subject}\nHi dear ${name}\nThank you for your request\n
    \nKing County Movers team always glad to help you with any questions\n
    \nHere is your estimate\n
    \nName: ${name}\n
    \nPhone number: ${phone}\n
    \nPick-up address: ${pickUp}\n
    \nDelivery address: ${delivery}\n
    \nDistance: ${distance}\n
    \nType of Vehicle: ${type}\n
    \nMark of Vehicle: ${mark}\n
    \nModel of Vehicle: ${model}\n
    \nYear of Vehicle: ${year}\n
    \nDate: ${date}\n
    \nEstimate Price: ${estimatePrice}\n
    \nNotice: be attention this is not a bill! This is not a guaranteed amount! The final price may effective on many factors\n
    \nPlease check information on our web site www.kingcountymoversllc.com\n
    \nIf you have any questions, please feel free to contact us\n
    \n(206)451-9140\n
    \nOr respond on this message\n
    \nThanks,\nYour friends at King County Movers`,
  };
  console.log(message);
  //return sendEmailViaAwsSes(email, subject, message);
  return gmailSendMail(email, subject, message);
}
