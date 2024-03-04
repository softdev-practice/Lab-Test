// is_prime.test.js
const { is_prime, server } = require('./is_prime');

afterAll(done => {
  server.close(done);
});

test('true_when_x_is_17', () => {
  expect(is_prime(17)).toBe(true);
});

test('false_when_x_is_36', () => {
  expect(is_prime(36)).toBe(false);
});

test('true_when_x_is_13219', () => {
  expect(is_prime(13219)).toBe(true);
});
