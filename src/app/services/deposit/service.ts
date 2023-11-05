import { Account } from '../../entities/Account';
import { Deposit } from '../../entities/Deposit';
import { AppDataSource } from '../../DB/data-source';
import { DailyLimitError } from './error';
import { accountService } from '../account';

const MAX_DAILY_DEPOSIT = Number(process.env.MAX_DAILY_DEPOSIT) || 5000;

export class DepositService {
  private depositRepository = AppDataSource.getRepository(Deposit);

  public getBankAccountDeposits(accountId: number): Promise<Deposit[]> {
    return this.depositRepository.find({ where: { accountId: accountId } });
  }

  private async save(account: Account, amount: number) {
    const newDeposit = this.depositRepository.create({
      accountId: account.id,
      amount: amount,
    });
    return this.depositRepository.insert(newDeposit);
  }

  /**
   * Deposits can not be above $5000 per day.
   *
   * PS: We should consider using transactions
   *
   * @throws {DailyLimitError} throws if deposits daily limit
   * @throws {AccountNotFoundError} throws if account is not found
   */
  public async addDeposit(args: {
    accountId: number;
    amount: number;
  }): Promise<{ accountBalance: number }> {
    const { accountId, amount } = args;
    const account = await accountService.findOneById(accountId);

    account.deposits = await depositService.getBankAccountDeposits(accountId);

    const today = new Date();
    const totalTodayDeposits = depositService.calculateTotalTodayDeposits(
      account,
      today,
    );

    if (depositService.exceedsDailyLimit(totalTodayDeposits, amount)) {
      throw new DailyLimitError();
    }

    account.balance += amount;

    await accountService.save(account);
    await this.save(account, amount);

    return { accountBalance: account.balance };
  }

  public calculateTotalTodayDeposits(account: Account, today: Date): number {
    return account.deposits
      .filter(deposit => this.isSameDay(today, deposit.createdAt))
      .reduce((total, deposit) => total + deposit.amount, 0);
  }

  public exceedsDailyLimit(
    totalTodayDeposits: number,
    newDepositAmount: number,
  ): boolean {
    return totalTodayDeposits + newDepositAmount > MAX_DAILY_DEPOSIT;
  }

  public isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
}

export const depositService = new DepositService();
