import { Account } from '../../app/entities/Account';
import { DepositService } from '../../app/services/deposit/service';

describe('DepositService - calculateTotalTodayDeposits', () => {
  it('should calculate the total deposits for today', () => {
    const depositService = new DepositService();
    const today = new Date();
    const account: Account = {
      balance: 100,
      id: 1,
      deposits: [],
      createdAt: today,
      updatedAt: today,
    };

    account.deposits = [
      {
        createdAt: today,
        amount: 100,
        id: 1,
        accountId: 1,
        account,
        updatedAt: today,
      },
      {
        createdAt: today,
        amount: 200,
        id: 1,
        accountId: 1,
        account,
        updatedAt: today,
      },
      {
        createdAt: new Date('2023-11-01'),
        amount: 50,
        id: 1,
        accountId: 1,
        account,
        updatedAt: today,
      },
    ];

    const totalTodayDeposits = depositService.calculateTotalTodayDeposits(
      account,
      today,
    );

    expect(totalTodayDeposits).toBe(300);
  });
});

describe('DepositService - exceedsDailyLimit', () => {
  it('should check if total deposits exceed the daily limit', () => {
    const depositService = new DepositService();
    const totalTodayDeposits = 4900;
    const newDepositAmount = 300;

    const exceedsLimit = depositService.exceedsDailyLimit(
      totalTodayDeposits,
      newDepositAmount,
    );

    expect(exceedsLimit).toBe(true);
  });

  it('should not exceed the daily limit', () => {
    const depositService = new DepositService();
    const totalTodayDeposits = 4900;
    const newDepositAmount = 100;

    const exceedsLimit = depositService.exceedsDailyLimit(
      totalTodayDeposits,
      newDepositAmount,
    );

    expect(exceedsLimit).toBe(false);
  });
});

describe('DepositService - isSameDay', () => {
  it('should correctly compare two dates on the same day', () => {
    const depositService = new DepositService();
    const date1 = new Date('2023-11-05');
    const date2 = new Date('2023-11-05');

    const isSameDay = depositService.isSameDay(date1, date2);

    expect(isSameDay).toBe(true);
  });

  it('should correctly compare two dates on different days', () => {
    const depositService = new DepositService();
    const date1 = new Date('2023-11-05');
    const date2 = new Date('2023-11-06');

    const isSameDay = depositService.isSameDay(date1, date2);

    expect(isSameDay).toBe(false);
  });
});
