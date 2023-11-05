import { NextFunction, Request, Response } from 'express';
import { DailyLimitError, depositService } from '../../services/deposit';
import { AccountNotFoundError } from '../../services/account';

const postDepositController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accountId = parseInt(req.body.accountId);
  const amount = parseFloat(req.body.amount);

  if (isNaN(accountId) || isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const accountBalance = await depositService.addDeposit({
      accountId,
      amount,
    });
    res.json({ message: 'Deposit successful', payload: accountBalance });
  } catch (e) {
    if (e instanceof AccountNotFoundError) {
      res.status(404).json({ error: e.message });
      return;
    } else if (e instanceof DailyLimitError) {
      res.status(400).json({ error: e.message });
      return;
    }
    next(e);
  }
};

export default postDepositController;
