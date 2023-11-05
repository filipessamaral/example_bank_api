import { NextFunction, Request, Response } from 'express';
import { AccountNotFoundError, accountService } from '../../services/account';
import { WithdrawalOverdraftError } from '../../services/account/error';

const postWithdrawController = async (
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
    const accountBalance = await accountService.withdraw({ accountId, amount });
    res.json({ message: 'Withdrawal successful', payload: accountBalance });
  } catch (e) {
    if (e instanceof AccountNotFoundError) {
      res.status(404).json({ error: e.message });
      return;
    } else if (e instanceof WithdrawalOverdraftError) {
      res.status(400).json({ error: e.message });
      return;
    }

    next(e);
  }
};

export default postWithdrawController;
