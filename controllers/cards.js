import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Card from '../models/Card.js';

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = await new Card({ name, link, owner: req.user._id });
    return res.status(StatusCodes.CREATED).send(await newCard.save());
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};
