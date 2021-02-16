import { Router } from 'express';
import cardsGetAll from './cardsGetAll';
import cardGetById from './cardGetById';
import cardUpdateById from './cardUpdateById';
import cardDeleteById from './cardDeleteById';
import cardsDeleteAll from './cardsDeleteAll';
import cardsCreate from './cardsCreate';

const router = Router();
router.post('/', cardsCreate); // POST localhost:5000/user/
router.get('/', cardsGetAll);
router.get('/:cardId', cardGetById);
router.patch('/:cardId', cardUpdateById);
router.delete('/:cardId', cardDeleteById);
router.delete('/', cardsDeleteAll);

export default router;
