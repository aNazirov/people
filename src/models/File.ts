import { model, Schema, Types } from 'mongoose';

const file = new Schema({
  // имя, email, пароль, дата рождения, пол, фото
  path: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

export default model('File', file);
