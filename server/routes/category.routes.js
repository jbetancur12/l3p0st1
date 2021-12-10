import express from 'express';
import categoryCtrl from '../controllers/category.controller';

const router = express.Router();

router.route('/api/categories').get(categoryCtrl.list).post(categoryCtrl.create);

router.get('/api/category/products/:categoryId', categoryCtrl.productsByCategory)

// router
//   .route('/api/categories/:categoryId')
//   .get(categoryCtrl.read)
//   .put(categoryCtrl.update)
//   .delete(categoryCtrl.remove);

router.param('categoryId', categoryCtrl.categoryByID);

export default router;
