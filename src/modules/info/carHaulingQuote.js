import { get } from 'lodash';
import message from '../utils/messages';
import sendMailCarHaulingEstimate from '../mail/sendMailCarHaulingEstimate';

export default async function CarHaulingQuote(req, res) {
  const name = get(req, 'body.name', '');
  const email = get(req, 'body.email', '').trim().toLowerCase();
  const phone = get(req, 'body.phone', '');
  const pickUp = get(req, 'body.pickUpAddress', '');
  const delivery = get(req, 'body.deliveryAddress', '');
  const distance = get(req, 'body.distance', '');
  const type = get(req, 'body.type', '');
  const mark = get(req, 'body.mark', '');
  const model = get(req, 'body.model', '');
  const year = get(req, 'body.year', '');
  const date = get(req, 'body.date', '');
  let deliveryRate = 1.5;
  if (email.includes(' ')) {
    return res.secure(400).json(message.fail('Wrong Email Format'));
  }

  const newDistance = +distance.replace(/[a-zA-Z, ]/g, '');

  let estimatePrice = +(newDistance * deliveryRate).toFixed();

  const createdEstimate = await sendMailCarHaulingEstimate({
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
