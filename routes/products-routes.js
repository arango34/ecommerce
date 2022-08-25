import express from 'express';
const router = express.Router();

import {
  getAllProducts,
  getSingleProduct,
  getProductImgs,
  getProductDepartments,
} from '../controllers/products-controller.js';

router.route('/').get(getAllProducts);
router.route('/images').get(getProductImgs);
router.route('/departments').get(getProductDepartments);
router.route('/product/:id').get(getSingleProduct);
router.route('/:category').get(getAllProducts);

export default router;
