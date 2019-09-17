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

  describe('getMenu', () => {
    it('should return menu', () => {
      expect(orders.getMenu().length).to.equal(16);
    });
  });

  describe('returnFoodPrice', () => {
    it('should return food items price', () => {
      expect(orders.returnFoodPrice("Rustic Cotton Sandwich")).to.equal('17.33');
    });
  });

  describe('addOrder', () => {
    it('should add an order', () => {
      expect(orders.orders.length).to.equal(17);
      orders.addOrder({
        userID: 1,
        date: orders.date,
        food: "Yummy Concrete Sandwich",
        totalCost: 100.00
      });
      expect(orders.orders.length).to.equal(18);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order', () => {
      expect(orders.orders.length).to.equal(18);
      orders.cancelOrder(1, "Yummy Concrete Sandwich");
      expect(orders.orders.length).to.equal(17); 
    });
  });

  describe('returnUserOrdersBill', () => {
    it('should return users orders bill', () => {
      orders.addOrder({
        userID: 1,
        date: orders.date,
        food: "Yummy Concrete Sandwich",
        totalCost: 100.00
      });
      expect(orders.returnUserOrdersBill(1)).to.equal(100);
    });
  });

  describe('returnOrdersTotal', () => {
    it('should return total of orders', () => {
      expect(orders.returnOrdersTotal([{
    userID: 14,
    date: "2019/07/29",
    food: "Rustic Cotton Sandwich",
    totalCost: 17.33
    },
    {
    userID: 92,
    date: "2019/07/29",
    food: "Tasty Wooden Sandwich",
    totalCost: 11.15
    }])).to.equal(28.479999999999997);
    });
  });
});