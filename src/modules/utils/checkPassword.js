export const checkPassword = (password) => /(?=.{5,})/.test(password);

import mongoose from 'mongoose/';
const { ObjectId } = mongoose.Types;
