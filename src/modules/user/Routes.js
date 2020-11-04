import { Router } from 'express';
import userRegister from './userRegister';
import userGetAll from './userGetAll';
import userGetById from './userGetById';
import userUpdateById from './userUpdateById';

const router = Router();
router.post('/', userRegister); // POST localhost:5000/user/
router.get('/', userGetAll);
router.get('/:userId', userGetById);
router.patch('/:userId', userUpdateById);

export default router;
