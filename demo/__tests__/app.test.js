const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');
jest.mock('../lib/utils/twilio');
const twilio = require('../lib/utils/twilio');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let order;
  beforeEach(async () => {
    order = await Order.insert({ quantity: 10 });

    twilio.sendSms.mockReset();
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        expect(twilio.sendSms).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '2',
          quantity: 10,
        });
      });
  });

  it('gets all of the orders from the database', async () => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });

    const res = await request(app).get(`/api/v1/orders`);

    expect(res.body[0]).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('gets one order by id', async () => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });

    const res = await request(app).get(`/api/v1/orders/1`);

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('edit one order by id', async () => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });

    const res = await request(app)
      .put(`/api/v1/orders/1`)
      .send({ quantity: 5 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 5,
    });
  });

  it('sends text when order is updated', async () => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });

    expect(twilio.sendSms).toHaveBeenCalledTimes(1);
  });

  it('deletes one order', async () => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });

    const res = await request(app).delete('/api/v1/orders/1');

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('sends a text while deleting one order', async () => {
    const res = await request(app).delete('/api/v1/orders/1');

    expect(twilio.sendSms).toHaveBeenCalledTimes(1);
  });
});
