import { get } from 'lodash';
import message from '../utils/messages';
import sendMailStorageEstimate from '../mail/sendMailStorageEstimate';

export default async function StorageQuote(req, res) {
  const name = get(req, 'body.name', '');
  const email = get(req, 'body.email', '').trim().toLowerCase();
  const phone = get(req, 'body.phone', '');
  const pickUp_date = get(req, 'body.pickUpDate', '');
  const delivery_date = get(req, 'body.deliveryDate', '');
  const size = get(req, 'body.size', '');
  const numberOfMonth = get(req, 'body.numberOfMonth', '');

  if (email.includes(' ')) {
    return res.secure(400).json(message.fail('Wrong Email Format'));
  }

  let estimatePrice;

  if (size == 1) {
    estimatePrice = 300 * 1 * +numberOfMonth;
  }
  if (size == 2) {
    estimatePrice = 300 * 1 * +numberOfMonth;
  }
  if (size == 3) {
    estimatePrice = 300 * 1.2 * +numberOfMonth;
  }
  if (size == 4) {
    estimatePrice = 300 * 1.5 * +numberOfMonth;
  }
  if (size == 5) {
    estimatePrice = 300 * 1.8 * +numberOfMonth;
  }
  if (size == 6) {
    estimatePrice = 300 * 2 * +numberOfMonth;
  }
  if (size == 7) {
    estimatePrice = 300 * 2 * +numberOfMonth;
  }

  const createdEstimate = await sendMailStorageEstimate({
    email,
    name,
    phone,
    pickUp_date,
    delivery_date,
    estimatePrice,
    numberOfMonth,
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
