import express from 'express';
const router = express.Router();
import { getTokenMiddleware } from '../middleware/get-token.js';

import {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
} from '../controllers/users-controller.js';

router.route('/').get(getAllUsers).post(registerUser);
router.route('/login').post(getTokenMiddleware, loginUser);
router.route('/:id').get(getSingleUser);

export default router;
