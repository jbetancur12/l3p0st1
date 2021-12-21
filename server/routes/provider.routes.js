import express from 'express';
import providerCtrl from '../controllers/provider.controller';
import categoryCtrl from '../controllers/category.controller';

const router = express.Router();

router.route('/api/providers').get(providerCtrl.list).post(providerCtrl.create);

router
  .route('/api/providers/categories/:categoryId')
  .get(providerCtrl.providersByCategory);

router
  .route('/api/provider/:providerId')
  .get(providerCtrl.read)
  .put(providerCtrl.update)
  .delete(providerCtrl.remove);

// router
//   .route('/api/categories/:providerId')
//   .get(providerCtrl.read)
//   .put(providerCtrl.update)
//   .delete(providerCtrl.remove);

router.param('providerId', providerCtrl.providerByID);
router.param('categoryId', categoryCtrl.categoryByID);

export default router;
