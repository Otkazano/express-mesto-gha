import { StatusCodes } from 'http-status-codes';
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
    const newCard = await new Card(req.body);
    return res.status(StatusCodes.CREATED).send(await newCard.save());
  } catch (error) {
    if (error.name === 'ValidationError') {
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
    if (!req.params.cardId) {
      throw new Error('NotFound');
    }
    const card = await Card.findByIdAndDelete(req.params.cardId);
    return res.send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error.message === 'NotFound') {
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
    if (!req.params.cardId) {
      throw new Error('NotFound');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    return res.send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error.message === 'NotFound') {
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
    if (!req.params.cardId) {
      throw new Error('NotFound');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    return res.send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Переданы неверные данные', ...error });
    }
    if (error.message === 'NotFound') {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};
