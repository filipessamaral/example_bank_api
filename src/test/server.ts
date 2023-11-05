import { Server } from 'http';
import { startApp } from '../app/main';

export async function startTestServer() {
  return await startApp(false); // Do not connect to the database
}

export async function closeTestServer(server: Server) {
  server.close();
}
