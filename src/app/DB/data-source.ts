import { DataSource } from 'typeorm';
import { Account } from '../entities/Account';
import { Deposit } from '../entities/Deposit';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'BankMock',
  synchronize: true, // should be false in production / replaced with migrations
  logging: false,
  entities: [Account, Deposit],
  subscribers: [],
  migrations: [],
});
