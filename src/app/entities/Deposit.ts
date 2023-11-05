import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';
import { Common } from './common';

@Entity()
export class Deposit extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  amount: number;

  @ManyToOne(type => Account, account => account.deposits)
  account: Account;
}
