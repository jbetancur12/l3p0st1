import express from 'express';
import roleCtrl from '../controllers/role.controller';

const router = express.Router();

router
  .route('/api/roles')
  .get(roleCtrl.list)
  .post(roleCtrl.create);

router
  .route('/api/role/:roleId')
  .get(roleCtrl.read)
  .put(roleCtrl.update)
  .delete(roleCtrl.remove);

router.param('roleId', roleCtrl.roleByID);

export default router;
