import { NextFunction, Request, Response } from 'express';
import {
  AccountNotFoundError,
  InsufficientFundsError,
  accountService,
} from '../../services/account';

const postTransferController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const fromAccountId = parseInt(req.body.fromAccountId);
  const toAccountId = parseInt(req.body.toAccountId);
  const amount = parseFloat(req.body.amount);

  if (isNaN(fromAccountId) || isNaN(toAccountId) || isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  if (fromAccountId === toAccountId) {
    return res
      .status(400)
      .json({ message: 'Cannot transfer to the same account' });
  }

  try {
    await accountService.makeTransfer({ fromAccountId, toAccountId, amount });
    res.json({ message: 'Transfer successful' });
  } catch (e) {
    if (e instanceof AccountNotFoundError) {
      res.status(404).json({ error: e.message });
      return;
    } else if (e instanceof InsufficientFundsError) {
      res.status(400).json({ error: e.message });
      return;
    }

    next(e);
  }
};

export default postTransferController;
