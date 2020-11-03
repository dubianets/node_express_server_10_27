import { Router } from 'express';
import userRegister from './userRegister';

const router = Router();
router.post('/', userRegister); // POST localhost:5000/user/

export default router;