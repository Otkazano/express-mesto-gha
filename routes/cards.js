import { Router } from 'express'
import { createCard, deleteCard, dislikeCard, getCards, likeCard } from '../controllers/cards.js'

export const cardRouter = Router()

cardRouter.get('/cards', getCards)
cardRouter.post('/cards', createCard)
cardRouter.delete('/cards/:cardId', deleteCard)
cardRouter.put('/cards/:cardId/likes', likeCard)
cardRouter.delete('/cards/:cardId/likes', dislikeCard)