// is_prime.test.js
const { is_even, server } = require('./is_prime');

afterAll(done => {
  server.close(done);
});

test('test_x_is_1', () => {
  expect(is_even(1)).toBe(false);
});

test('test_x_is_0', () => {
  expect(is_even(0)).toBe(true);
});

test('test_x_is_neg2', () => {
  expect(is_even(-2)).toBe(true);
});
