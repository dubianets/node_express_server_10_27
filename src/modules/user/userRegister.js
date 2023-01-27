import User from './Model';
import mongoose from 'mongoose';

export default function userRegister(req, res) {
  const userId = new mongoose.Types.ObjectId();

  const newUser = new User({
    _id: userId,
    email: req.body.email,
    password: req.body.password,
  });
  
   newUser
       .save()
    .then(() => {
      res.status(200).json('User created');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('User not created');
    })
    .finally(() => {
      console.log('End')
    })

}