import { Router } from 'express';
import {
  postDepositController,
  postTransferController,
  postWithdrawController,
} from '../controllers/Account';

const router = Router();

router.post('/deposit', postDepositController);
router.post('/withdraw', postWithdrawController);
router.post('/transfer', postTransferController);

export default router;
