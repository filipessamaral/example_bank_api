abstract class AccountError extends Error {}

export class AccountNotFoundError extends AccountError {
  constructor(id: number) {
    super(`Account not found: ${id}`);
  }
}

export class InsufficientFundsError extends AccountError {
  constructor() {
    super('Insufficient balance for the transfer');
  }
}

export class WithdrawalOverdraftError extends AccountError {
  constructor() {
    super('Withdrawal exceeds overdraft limit');
  }
}
