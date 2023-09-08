import { get } from 'lodash';
import message from '../utils/messages';
import sendMailLocalEstimate from '../mail/sendMailLocalEstimate';

export default async function LocalQuote(req, res) {
  const name = get(req, 'body.name', '');
  const email = get(req, 'body.email', '').trim().toLowerCase();
  const phone = get(req, 'body.phone', '');
  const pickUp = get(req, 'body.pickUpAddress', '');
  const delivery = get(req, 'body.deliveryAddress', '');
  const distance = get(req, 'body.distance', '');
  const duration = get(req, 'body.duration', '');
  let size = get(req, 'body.size', '');
  const date = get(req, 'body.date', '');
  let estimateGas = 0;

  if (email.includes(' ')){
    return res.secure(400).json(message.fail('Wrong Email Format'));
  }

  const newDistance = +distance.replace(/[a-zA-Z, ]/g, '');
  let newDuration;
  if (duration.includes('hour') ){
    newDuration = duration.replace(/hour/i, '.');
    newDuration = +newDuration.replace(/[a-zA-Z, ]/g, '');
  } else if (duration.includes('hours')){
    newDuration = duration.replace(/hours/i, '.');
    newDuration = +newDuration.replace(/[a-zA-Z, ]/g, '');
  } else {
    newDuration = duration.replace(/[a-zA-Z, ]/g, '') / 60;
  }

  if (size <= 3){
    size = 3;
  };
  if (newDistance >= 15 && newDistance < 30){
    estimateGas = 60;
  } else if (newDistance >= 30 && newDistance < 50){
    estimateGas = 100;
  }else if (newDistance >= 50 && newDistance < 100){
    estimateGas = 150;
  }else if (newDistance >= 100){
    estimateGas = 200;
  };

  let estimateTime;
  if (newDuration >= 0.5){
    estimateTime = +((size + newDuration) * 120).toFixed();
  } else {
    estimateTime = +(size * 120).toFixed();}

  let estimateTotal = estimateTime + estimateGas;

  const moveSize = [
    '0',
    'Some items',
    'Studio',
    '1 Bedroom Small',
    '1 Bedroom Large',
    '2 Bedroom',
    '3 Bedroom',
    '4 Bedroom and more',
  ];
  size = moveSize[size];

  const createdEstimate = await sendMailLocalEstimate ({
    email,
    name,
    phone,
    pickUp,
    delivery,
    distance,
    date,
    size,
    estimateGas,
    estimateTime,
    estimateTotal
  })
    .then((result) =>{
      const analyticsId ={
        reason: get(createdEstimate, 'payload.message'),
        email,
      };
      return res.status(201).json(message.success('Estimate sent successfully. Please check your email',analyticsId))})
    .catch((error) => {
      const analyticsId ={
        reason: get(createdEstimate, 'payload.message'),
        email,
      }
      return res.status(404).json(message.fail('Estimate was not send', analyticsId))
});
}
