import { Router } from 'express';
import userRegister from './userRegister';
import userGetAll from './userGetAll';
import userGetById from './userGetById';
import userUpdateById from './userUpdateById';
import userDeleteById from './userDeleteById';
import userDeleteAll from './userDeleteAll';
import userLogin from './userLogin';

const router = Router();
router.post('/', userRegister); // POST localhost:8000/user/
router.get('/', userGetAll);
router.post('/login', userLogin);
router.get('/:userId', userGetById);
router.patch('/:userId', userUpdateById);
router.delete('/:userId', userDeleteById);
router.delete('/', userDeleteAll);

export default router;
