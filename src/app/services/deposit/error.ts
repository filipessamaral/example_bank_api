abstract class DepositError extends Error {}

export class DailyLimitError extends DepositError {
  constructor() {
    super('Daily limit exceeded.');
  }
}
