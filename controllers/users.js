import User from '../models/User.js'

const ERROR_CODE_DUPLICATE_MONGO = 11000

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return res.send(users)
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ошибка на стороне севера', error: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('NotFound')
    }
    res.status(200).send(user)
  } catch (error) {
    if (error.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найден' })
    }

    return res
      .status(500)
      .send({ message: 'Ошибка на стороне сервера', error: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body
    const newUser = await new User({ name, about, avatar })

    return res.status(201).send(await newUser.save())
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', ...error })
    }

    if (error.code === ERROR_CODE_DUPLICATE_MONGO) {
      return res.status(409).send({ message: 'Пользователь уже существует' })
    }

    return res
      .status(500)
      .send({ message: 'Ошибка на стороне сервера', error: error.message })
  }
}

export const updateInfoProfile = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error('NotFound')
    }
    const { name, about } = req.body
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true
      }
    )
    return res.json(updatedInfo)
  } catch (error) {
    if (error.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найден' })
    }
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', ...error })
    }

    return res
      .status(500)
      .send({ message: 'Ошибка на стороне севера', error: error.message })
  }
}

export const updateAvatarProfile = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error('NotFound')
    }
    const { avatar } = req.body
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true
      }
    )
    return res.json(updatedInfo)
  } catch (error) {
    if (error.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найден' })
    }
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .send({ message: 'Переданы неверные данные', ...error })
    }

    return res
      .status(500)
      .send({ message: 'Ошибка на стороне севера', error: error.message })
  }
}
