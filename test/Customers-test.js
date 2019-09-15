const chai = require('chai');
const expect = chai.expect;
const mockCustomers = require('./mockData/mockCustomersData');
import Customers from '../src/Customers';

describe('Customers', () => {
  const customers = new Customers(mockCustomers.customers);

  it('should be a function', () => {
    expect(Customers).to.be.a('function');
  });

  it('should be an instance of Customers', () => {
    expect(customers).to.be.an.instanceof(Customers);
  });

  describe('findCustomer', () => {
    it('should return user given full name', () => {
      expect(customers.findCustomer('Matilde Larson').id).to.equal(1);
    });
  });

  describe('findCustomers', () => {
    it('should return all users whose name includes subset name', () => {
      expect(customers.findCustomers('matilde larson').length).to.equal(1);
      expect(customers.findCustomers('ch').length).to.equal(6);
    });
  });

  describe('createCustomer', () => {
    it('should create new user if user doesnt already exist', () => {
      customers.createCustomer('matilde', 'larson');
      expect(customers.customers.length).to.equal(20);
      customers.createCustomer('bruce', 'willis');
      expect(customers.customers.length).to.equal(21);
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize first letter on string', () => {
      expect(customers.capitalizeFirst('wayne')).to.equal('Wayne');
    });
  });

  describe('returnFullName', () => {
    it('should return one name given first/last', () => {
      expect(customers.returnFullName('bruce', 'willis')).to.equal('Bruce Willis');
    });
  });

  describe('returnNewestCustomer', () => {
    it('should return user created most recently', () => {
      expect(customers.returnNewestCustomer().name).to.equal('Bruce Willis');
    });
  });
});