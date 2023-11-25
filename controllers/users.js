import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import generateToken from '../utils/jwt.js'
import { ERROR_CODE_DUPLICATE_MONGO, SALT_ROUNDS } from '../utils/constants.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    return User.findUserByCredentials(email, password).then(user => {
      res.send({
        token: generateToken({ _id: user._id })
      })
    })
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: 'Неправильные почта или пароль', error: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const newUser = await bcrypt
      .hash(req.body.password, SALT_ROUNDS)
      .then(hash => User.create({ ...req.body, password: hash }))

    return res
      .status(StatusCodes.CREATED)
      .send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        _id: newUser._id,
        email: newUser.email
      })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error })
    }

    if (error.code === ERROR_CODE_DUPLICATE_MONGO) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ message: 'Пользователь уже существует' })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return res.send(users)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне севера', error: error.message })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail()
    return res.status(StatusCodes.OK).send(user)
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error })
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).orFail()
    return res.status(StatusCodes.OK).send(user)
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error })
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message })
  }
}

export const updateInfoProfile = async (req, res) => {
  try {
    const { name, about } = req.body
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true
      }
    ).orFail()
    return res.json(updatedInfo)
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' })
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне севера', error: error.message })
  }
}

export const updateAvatarProfile = async (req, res) => {
  try {
    const { avatar } = req.body
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true
      }
    ).orFail()
    return res.json(updatedInfo)
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' })
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error })
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне севера', error: error.message })
  }
}
