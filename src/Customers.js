class Customers {
  constructor(customers) {
    this.customers = customers;
  }

  findCustomers(name) {
    const customers = this.customers.filter(customer => customer.name.toLowerCase().includes(name));
    return customers;
  }

  findCustomer(name) {
    return this.customers.find(customer => customer.name === name);
  }
}

export default Customers;