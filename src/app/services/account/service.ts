import { Repository } from 'typeorm';
import { AppDataSource } from '../../DB/data-source';
import { Account } from '../../entities/Account';
import {
  AccountNotFoundError,
  InsufficientFundsError,
  WithdrawalOverdraftError,
} from './error';

const OVERDRAFT_LIMIT = Number(process.env.OVERDRAFT_LIMIT) || -200;

class AccountService {
  private readonly accountRepository: Repository<Account> =
    AppDataSource.getRepository(Account);

  /**
   * Transfers don’t support overdrafts (can’t leave the balance below 0).
   *
   * @throws {AccountNotFoundError} throws if account is not found
   */
  public async findOneById(accountId: number): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new AccountNotFoundError(accountId);

    return account;
  }

  public async save(accounts: Account | Account[]): Promise<void> {
    if (Array.isArray(accounts)) {
      for (const account of accounts) {
        await this.accountRepository.save(account);
      }
    } else {
      this.accountRepository.save(accounts);
    }
  }

  /**
   * Transfers don’t support overdrafts (can’t leave the balance below 0).
   *
   * @throws {InsufficientFundsError} throws if deposits daily limit
   * @throws {AccountNotFoundError} throws if account is not found
   */
  public async makeTransfer(args: {
    fromAccountId: number;
    toAccountId: number;
    amount: number;
  }): Promise<void> {
    const { amount, fromAccountId, toAccountId } = args;
    const [fromAccount, toAccount] = await Promise.all([
      accountService.findOneById(fromAccountId),
      accountService.findOneById(toAccountId),
    ]);

    if (fromAccount.balance < amount) {
      throw new InsufficientFundsError();
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;
    await accountService.save([fromAccount, toAccount]);
  }

  /**
   * Withdrawal supports a $200 overdraft (balance, can be down to -$200).
   *
   * @throws {WithdrawalOverdraftError} throws if withdraw gets under limit
   * @throws {AccountNotFoundError} throws if account is not found
   */
  public async withdraw(args: {
    accountId: number;
    amount: number;
  }): Promise<{ accountBalance: number }> {
    const { accountId, amount } = args;
    const account = await accountService.findOneById(accountId);

    const newBalance = account.balance - amount;

    if (newBalance < OVERDRAFT_LIMIT) {
      throw new WithdrawalOverdraftError();
    }

    account.balance = newBalance;
    await accountService.save(account);
    return { accountBalance: account.balance };
  }
}

export const accountService = new AccountService();
