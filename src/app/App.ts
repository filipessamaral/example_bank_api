import express, { Express } from 'express';
import { Server } from 'http';
import routes from './routes';

export class App {
  public readonly express: Express = express();
  private readonly port: number;
  private server: Server | undefined;

  constructor(port: number) {
    this.port = port;
  }

  start(): Server {
    this.express.use(routes);
    this.express.get('/dummy', (req, res) => {
      res.status(200).json({ ok: 'ok' });
    });

    this.server = this.express.listen(this.port);
    return this.server;
  }

  stop(): void {
    this.server?.close();
  }
}
