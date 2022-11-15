import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';

import { listCategories, createCategory, listProductsByCategory } from './services/Category.services';
import { createOrder, deleteOrder, listOrders, updateOrder } from './services/Order.services';
import { createProducts, listProducts } from './services/Product.services';

const router = Router();

const upload = multer({
  storage: multer.diskStorage(
    {
      destination(req, file, callback) {
        // callback(null, path.resolve(__dirname, '..', 'uploads')); // unix
        callback(null, path.resolve(__dirname, '..', 'uploads').replace('\\src', '')); // windows
      },
      filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
      }
    }),
});

router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProducts);

router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', updateOrder);
router.delete('/orders/:orderId', deleteOrder);

export default router;