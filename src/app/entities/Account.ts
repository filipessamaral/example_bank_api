import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Deposit } from './Deposit';
import { Common } from './common';

@Entity()
export class Account extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToMany(type => Deposit, deposit => deposit.account)
  deposits: Deposit[];
}
