import express, { NextFunction, Request, Response } from 'express';

import { Router } from 'express';
import accountRoutes from './accountRoutes';

const router = Router();
router.use(express.json());
router.use('/account', accountRoutes);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

export default router;
