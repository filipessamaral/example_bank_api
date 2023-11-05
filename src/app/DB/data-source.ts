import { DataSource } from 'typeorm';
import { Account } from '../entities/Account';
import { Deposit } from '../entities/Deposit';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD ||'root',
  database: process.env.DB_DATABASE || 'BankMock',
  synchronize: true, // should be false in production / replaced with migrations
  logging: false,
  entities: [Account, Deposit],
  subscribers: [],
  migrations: [],
});
