const chai = require('chai');
const expect = chai.expect;
const orderData = require('./mockData/mockOrdersData.js');
import Orders from '../src/Orders';

describe('Orders', () => {
  const date = "2019/07/29";
  const orders = new Orders(date, orderData.roomServices);

   it('should be a function', function() {
    expect(Orders).to.be.a('function');
  });

  it('should be an instance of Orders', function() {
    expect(orders).to.be.an.instanceof(Orders);
  }); 

  describe('returnTodaysOrders', () => {
    it('should return orders for today', () => {
      expect(orders.returnTodaysOrders().length).to.equal(4);
    });
  });

  describe('returnOrderRevenueToday', () => {
    it('should return revenue for service orders today', () => {
      expect(orders.returnOrderRevenueToday()).to.equal('58.25');
    });
  });

  describe('returnTotalOrderRevenueAllTime', () => {
    it('should return all time revenue on orders', () => {
      expect(orders.returnTotalOrderRevenueAllTime()).to.equal('248.07');
    });
  });

  describe('findUserOrdersAllTime', () => {
    it('should return specific users order data for all time', () => {
      expect(orders.findUserOrdersAllTime(14).length).to.equal(3);
    });
  });

  describe('findUserOrdersToday', () => {
    it('should return users orders today', () => {
      expect(orders.findUserOrdersToday(14).length).to.equal(2);
    });
  });
});