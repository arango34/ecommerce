import express from 'express';
const router = express.Router();

import {
  getAllCarts,
  getSingleCart,
  getUserCart,
} from '../controllers/cart-controller.js';

router.route('/').get(getAllCarts);
router.route('/user/:id').get(getUserCart);
router.route('/:id').get(getSingleCart);

export default router;
