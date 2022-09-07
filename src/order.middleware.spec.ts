import { OrderMiddleware } from './order.middleware';

describe('OrderMiddleware', () => {
  it('should be defined', () => {
    expect(new OrderMiddleware()).toBeDefined();
  });
});
