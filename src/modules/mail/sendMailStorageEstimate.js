import gmailSendMail from './gmailSES';

export default async function sendMailStorageEstimate({
  email,
  name,
  phone,
  pickUp_date,
  delivery_date,
  size,
  estimatePrice,
  numberOfMonth,
}) {
  //const host = process.env.CLIENT_HOST;
  const subject = 'King County Movers Storage service Estimate';
  const message = {
    html: `<html lang='en'>
    <head>
    <meta charset='UTF-8'>
    <title>ESTIMATE EMAIL</title>
      <style>
        .container{
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        }
        h1 {
        text-align: center;
        color: #333;
        }
        table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        }
        th{
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        background-color: #f2f2f2;
        }
        .tr_description {
        background-color: mediumspringgreen;
        }
        .total {
        text-align: left;
        font-weight: bold;
        font-size: large;
        }
      </style>
    </head>
    
      <body>
        <div class='container'>
        <p><h3>${subject}</h3>
          Hi dear ${name}<br/>
          Thank you for your request<br/>
          King County Movers team always glad to help you with any questions</p>
          <br/>
          <table>
            <tr>
              <th class='tr_description'>DESCRIPTION</th>
              <th class='tr_description'>CLIENT INFO</th>
            </tr>
            <tr>
              <th>NAME</th>
              <th>${name}</th>
            </tr>
            <tr>
              <th>PHONE NUMBER</th>
              <th>${phone}</th>
            </tr>
            <tr>
              <th>START DATE</th>
              <th>${pickUp_date}</th>
            </tr>
            <tr>
              <th>END DATE</th>
              <th>${delivery_date}</th>
            </tr>
            <tr>
              <th>SIZE</th>
              <th>${size}</th>
            </tr>
            <tr>
              <th>NUMBER OF FULL MONTH</th>
              <th>${numberOfMonth}</th>
            </tr>
            <tr>
              <td colspan='2' class='total'>ESTIMATE PRICE: ${estimatePrice}$ </td>
            </tr>
          </table>
          <br/>
          <h4>Notice:</h4> 
           Be attention this is not a bill!<br/>
           This is not a guaranteed amount!<br/>
           The final price may effective on many factors
           <br/><br/>
           Please check information on our web site <a href= "Kingcountymovers.com">www.kingcountymoversllc.com</a>
           <br/><br/>
            If you have any questions, please feel free to contact us<br/>
           (206)451-9140
          <br/>
          Or respond on this message<br/>
          <br/>
          Thanks,<br/>
          Your friends at King County Movers<br/>
          <img src = 'https://gcdnb.pbrd.co/images/cQTLfSIuqvga.jpg?o=1' alt = 'LOGO'/>
         </div>
      </body>
    </html>`,
    text: `${subject}\nHi dear ${name}\nThank you for your request\n
    \nKing County Movers team always glad to help you with any questions\n
    \nHere is your estimate\n
    \nName: ${name}\n
    \nPhone number: ${phone}\n
    \nStart date: ${pickUp_date}\n
    \nEnd date: ${delivery_date}\n
    \nSize: ${size}\n
    \nNumber of full month: ${numberOfMonth}\n
    \nEstimate Price: ${estimatePrice}\n
    \nNotice: be attention this is not a bill! This is not a guaranteed amount! The final price may effective on many factors\n
    \nPlease check information on our web site www.kingcountymoversllc.com\n
    \nIf you have any questions, please feel free to contact us\n
    \n(206)451-9140\n
    \nOr respond on this message\n
    \nThanks,\nYour friends at King County Movers`,
  };
  //return sendEmailViaAwsSes(email, subject, message);
  return gmailSendMail(email, subject, message);
}
