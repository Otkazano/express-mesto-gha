import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import { URLExpression } from '../utils/constants.js'

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто'
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь'
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      match: [URLExpression, 'Некорректный URL']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator: {
        validator: v => validator.isEmail(v),
        message: 'Неправильный формат'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
      select: false
    }
  },
  { versionKey: false }
)

userScheme.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'))
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'))
        }
        return user
      })
    })
}

export default mongoose.model('user', userScheme)
