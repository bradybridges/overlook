class Orders {
  constructor(date, orders) {
    this.date = date;
    this.orders = orders;
  }

  returnTodaysOrders() {
    return this.orders.filter(order => order.date === this.date);
  }

  returnOrderRevenueToday() {
    const orders = this.orders.filter(order => order.date === this.date);
    const revenue = orders.reduce((total, order) => {
      total += order.totalCost;
      return total;
    }, 0);
    return revenue;
  }

  returnTotalOrderRevenueAllTime() {
    const revenue =  this.orders.reduce((total, order) => {
      total += order.totalCost;
      return total;
    }, 0);
    return revenue.toFixed(2);
  }
}

export default Orders;