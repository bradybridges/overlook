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

  createCustomer(firstName, lastName) {
     const name = this.returnFullName(firstName, lastName);
     const doesCustomerExist = this.findCustomer(name) !== undefined;
    
     if(!doesCustomerExist) {
      const id = this.customers.length + 1;
      const newCustomer = {id, name};
      this.customers.push(newCustomer);
      return true;
     } else {
      return false;
     }
  }

  capitalizeFirst(name) {
    let capName = name.split('');
    capName[0] = capName[0].toUpperCase();
    return capName.join('');
  }

  returnFullName(firstName, lastName) {
    const first = this.capitalizeFirst(firstName);
    const last = this.capitalizeFirst(lastName);
    const name = first.concat(' ').concat(last);
    return name;
  }

  returnNewestCustomer() {
    const newestCustomer = this.customers.length - 1;
    return this.customers[newestCustomer];
  }
}

export default Customers;