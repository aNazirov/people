import { model, Schema, Types } from 'mongoose';
import { regEmail, regGender } from '../utils';

const user = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    match: regEmail,
    unique: true,
  },
  gender: {
    type: String,
    match: regGender,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  photo: {
    type: Types.ObjectId,
    ref: 'File',
  },
});

export default model('User', user);
