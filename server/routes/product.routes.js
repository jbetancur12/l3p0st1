import express from 'express';
import productCtrl from '../controllers/product.controller';
import categoryCtrl from '../controllers/category.controller';
import providerCtrl from '../controllers/provider.controller';

const router = express.Router();

router.route('/api/products').get(productCtrl.list).post(productCtrl.create);

//router.post('/api/product/:categoryId/:providerId', productCtrl.create)

router
  .route('/api/product/:productId')
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(categoryCtrl.remove);

router
  .route('/api/product/price/:providerName/:categoryName')
  .get(productCtrl.price);
// .put(categoryCtrl.update)

//router.param('categoryId', categoryCtrl.categoryByID);
//router.param('providerId', providerCtrl.providerByID);
router.param('productId', productCtrl.productByID);
router.param('providerName', providerCtrl.providerName);
router.param('categoryName', categoryCtrl.categoryName);

export default router;
