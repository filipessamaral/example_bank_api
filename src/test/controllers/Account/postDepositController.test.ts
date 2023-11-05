import request from 'supertest';
import { ServerConfig } from '../../../app/main';
import { closeTestServer, startTestServer } from '../../server';

//jest.mock('../../../app/services/deposit/service');

const ACCOUNT_ROUTE_URL = '/account';

/* const mockRequest = {
    body: {
        accountId: '123',
        amount: '100.50',
    },
}; */

let testServer: ServerConfig;
beforeAll(async () => {
  testServer = await startTestServer();
});

afterAll(async () => {
  await closeTestServer(testServer.server);
});

describe('POST /deposit', () => {
  /*     it('should respond with 200 OK and a success message', async () => {
           // (DepositService.prototype.addDeposit as jest.Mock).mockResolvedValue({ accountBalance: 500 });
    
            const response = await request(testServer.app.express)
                .post(`${ACCOUNT_ROUTE_URL}/deposit`)
                .send(mockRequest);
    
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Deposit successful');
        }); */

  it('should handle invalid input with a 400 status code', async () => {
    const response = await request(testServer.app.express)
      .post(`${ACCOUNT_ROUTE_URL}/deposit`)
      .send({
        accountId: 'invalidAccountId',
        amount: 'invalidAmount',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid input');
  });
});
