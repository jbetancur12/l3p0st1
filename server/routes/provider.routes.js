import express from 'express';
import providerCtrl from '../controllers/provider.controller';

const router = express.Router();

router.route('/api/providers').get(providerCtrl.list).post(providerCtrl.create);

router
  .route('/api/provider/:providerId')
  .get(providerCtrl.read)


// router
//   .route('/api/categories/:providerId')
//   .get(providerCtrl.read)
//   .put(providerCtrl.update)
//   .delete(providerCtrl.remove);

router.param('providerId', providerCtrl.providerByID);

export default router;