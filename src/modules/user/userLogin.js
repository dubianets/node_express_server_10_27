import User from './Model';
import { get, hasIn } from 'lodash';
import bcrypt from 'bcryptjs';
import message from '../utils/messages';
import jwt from 'jsonwebtoken';

export default function userLogin(req, res) {
  const email = get(req, 'body.email', '').trim().toLowerCase();

  User.findOne({ email: email })
    .select('+password')
    .exec()
    .then(async (user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
          if (err) {
            const analyticsId = {
              email,
              reason: err,
              isBodyPasswordExist: hasIn(req, 'body.password'),
              isUserPasswordExist: hasIn(user, 'password'),
            };
            return res.status(401).json(message.fail('Auth failed 1', analyticsId));
          } else if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              `${process.env.JWT_SECRET_KEY}`,
              {
                expiresIn: '90d',
              },
            );

            user.password = null;

            return res.status(200).json({
              message: 'Auth success',
              token,
              user: user,
              userId: user._id,
            });
          } else {
            const analyticsId = {
              email,
              reason: 'Wrong password',
            };
            res.status(401).json(message.fail('Auth failed 2', analyticsId));
          }
        });
      } else {
        const analyticsId = {
          email,
          reason: 'User not found',
        };
        res.status(401).json(message.fail('Auth failed 3', analyticsId));
      }
    })
    .catch((err) => {
      res.status(400).json(message.fail('Auth failed. Error'));
    });
}
