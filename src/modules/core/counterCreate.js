import mongoose from 'mongoose';

const Schema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        counter: {
            type: Number,
            default: 0,
        },

        docNumber: {
            type: String,
            default: '000001',
        },

        model: {
            type: String,
        },
    },
    { timestamps: {}, versionKey: false },
);

export default mongoose.model('Counter', Schema);
