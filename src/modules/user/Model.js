import mongoose from 'mongoose';

// const { Schema } = mongoose;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email:{
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  emailConfirmation: {
    hash: { type: String, select: false },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
   // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  resetPassword: {
    hash: { type: String, select: false },
    date: {
      select: false,
      type: Date,
      required: false,
    },
    history: [
      {
        date: Date,
      },
    ],
  },
  active: {
    type: Boolean,
    default: true,
}
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
