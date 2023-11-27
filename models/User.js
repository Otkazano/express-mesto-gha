import mongoose from 'mongoose';
import validator from 'validator';
import { URLExpression } from '../utils/constants.js';

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      match: [URLExpression, 'Некорректный URL'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

export default mongoose.model('user', userScheme);
