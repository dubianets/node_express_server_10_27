import User from './Model';
import mongoose from 'mongoose';
import { get } from 'lodash';
import { checkPassword } from '../utils/checkPassword';
import sendMailCreateUser from '../mail/sendMailCreateUser';
import message from '../utils/messages';
import bcrypt from 'bcryptjs';

export default  async function userRegister (req, res) {
  const email = get(req, 'body.email', '').trim().toLowerCase();
  const password = get(req, 'body.password', '');

  if (!checkPassword){
    const reson = "Wrong Password Format"
    const  analytics = {
      reason: reason,
      email,
    };

    return res.status(400).json(message.fail(reson, analytics));
  }

  if (email.includes(' ')){
    return res.secure(400).json(message.fail('Wrong Email Format'));
  }

  const isUserExist = await checkIsUserExist(email);

  if(isUserExist){
    const analytics = {
      reson: 'Mail exists',
      email
    };
    return res.status(409).json(message.fail('User with this e-mail exists', analytics));
  }

  const createdUser = await creatUser ({
    email,
    password,
  });

if (createdUser.success) {

  return res
    .status(201)
    .json(
      message.success(
        'User created successfully. Please check your email and verify it',
      ),
    );
} else {
  const analyticsId = {
    reason: get(createdUser, 'payload.message'),
    email,
  };

  return res.status(404).json(message.fail('User was not created', analyticsId));
}
};
function checkIsUserExist(email) {
  return User.findOne({ email: email })
    .exec()
    .then((doc) => !!doc)
    .catch(() => false);
}

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
async function creatUser ({ email, password }){
  const userId = new mongoose.Types.ObjectId();
  const emailHashConfirmation = new mongoose.Types.ObjectId();

  const newUser = new User({
    _id: userId,
    email,
    emailConfirmation: {
      hash: emailHashConfirmation,
      confirmed: false,
    },
    password: hashPassword(password),
  });

  return newUser
    .save()
    .then(() => {
      sendMailCreateUser({ email, emailHashConfirmation, userId})
        .catch((error) => {
         {email};
        throw new Error(error);
      });
      return message.success('User created successfully', userId, false);
    })
    .catch((error) => {
      if (error.code === 11000) return message.fail('User with entered email exist');
      return message.fail('Error', error);
    })
}