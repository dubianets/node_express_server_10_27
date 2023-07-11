import { get } from 'lodash';
import message from '../utils/messages';
import sendMailLongDistanceEstimate from '../mail/sendMailLongDistanceEstimate';

export default async function LongDistanceQuote(req, res) {
  const name = get(req, 'body.name', '');
  const email = get(req, 'body.email', '').trim().toLowerCase();
  const phone = get(req, 'body.phone', '');
  const pickUp = get(req, 'body.pickUpAddress', '');
  const delivery = get(req, 'body.deliveryAddress', '');
  const distance = get(req, 'body.distance', '');
  let size = get(req, 'body.size', '');
  const date = get(req, 'body.date', '');
  let deliveryRate = 3;
  if (email.includes(' ')) {
    return res.secure(400).json(message.fail('Wrong Email Format'));
  }

  const newDistance = +distance.replace(/[a-zA-Z, ]/g, '');

  if (size > 3) {
    deliveryRate = 4;
  }

  let estimateDelivery = +(newDistance * deliveryRate).toFixed();
  let estimateGas = +(estimateDelivery * 0.09).toFixed();
  let estimateTotal = estimateDelivery + estimateGas;

  const createdEstimate = await sendMailLongDistanceEstimate({
    email,
    name,
    phone,
    pickUp,
    delivery,
    distance,
    date,
    estimateGas,
    estimateDelivery,
    estimateTotal,
  })
    .then((result) => {
      const analyticsId = {
        reason: get(createdEstimate, 'payload.message'),
        email,
      };
      return res
        .status(201)
        .json(
          message.success(
            'Estimate sent successfully. Please check your email',
            analyticsId,
          ),
        );
    })
    .catch((error) => {
      const analyticsId = {
        reason: get(createdEstimate, 'payload.message'),
        email,
      };
      return res.status(404).json(message.fail('Estimate was not send', analyticsId));
    });
}
