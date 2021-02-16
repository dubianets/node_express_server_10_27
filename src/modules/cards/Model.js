import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cardsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Cards', cardsSchema);
