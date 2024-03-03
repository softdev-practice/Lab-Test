const request = require('supertest');
const app = require('./app');

describe('GET /is_prime/:a', () => {
  it('true_when_x_is_17', async () => {
    const response = await request(app).get('/is_prime/17');
    expect(response.status).toBe(200);
    expect(response.text).toBe('true');
  });

  it('false_when_x_is_36', async () => {
    const response = await request(app).get('/is_prime/36');
    expect(response.status).toBe(200);
    expect(response.text).toBe('false');
  });

  it('true_when_x_is_13219', async () => {
    const response = await request(app).get('/is_prime/13219');
    expect(response.status).toBe(200);
    expect(response.text).toBe('true');
  });

  afterAll(async () => {
    try {
      await app.close()
    }
    catch (err) {
      console.log(err)
    }
  });
});
