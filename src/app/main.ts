import * as Process from 'process';
import { App } from './App';
import { AppDataSource } from './DB/data-source';
import { Server } from 'http';

export type ServerConfig = {
  app: App;
  server: Server;
};

const port = Number(Process.env.PORT) || 3300;
console.log(`Starting the App in port ${port}`);

export const startApp = async (
  connectToDb: boolean = true,
): Promise<ServerConfig> => {
  const app = new App(port);
  let server: Server;
  try {
    if (connectToDb) {
      await AppDataSource.initialize();
    }

    server = app.start();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }

  return { app, server };
};

export default startApp;
