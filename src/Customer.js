class Customers {
  constructor(customers) {
    this.customers = customers;
  }

  findCustomers(name) {
    const customers = this. customers.filter(customer => customer.name.toLowerCase().includes(name));
    return customers;
  }
}

export default Customers;