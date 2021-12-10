import express from 'express';
import productCtrl from '../controllers/product.controller';
import categoryCtrl from '../controllers/category.controller';

const router = express.Router();

// router.route('/api/products').get(productCtrl.list).post(productCtrl.create);

router.post('/api/product/:categoryId', productCtrl.create)

// router
//   .route('/api/categories/:categoryId')
//   .get(categoryCtrl.read)
//   .put(categoryCtrl.update)
//   .delete(categoryCtrl.remove);

router.param('categoryId', categoryCtrl.categoryByID);

export default router;