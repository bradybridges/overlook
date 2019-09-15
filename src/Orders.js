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
    return revenue.toFixed(2);
  }

  returnTotalOrderRevenueAllTime() {
    const revenue =  this.orders.reduce((total, order) => {
      total += order.totalCost;
      return total;
    }, 0);
    return revenue.toFixed(2);
  }

  findUserOrdersAllTime(userID) {
    return this.orders.filter(order => order.userID === userID);
  }

  findUserOrdersToday(userID) {
    return this.orders.filter(order => {
      if(order.userID === userID && order.date === this.date) {
        return true;
      } else {
        return false;
      }
    })
  }

  getMenu() {
    const menu = this.orders.reduce((menu, currentOrder) => {
      if(!menu.find(morsel => morsel.food === currentOrder.food)){
        const totalCost = parseFloat(currentOrder.totalCost).toFixed(2);
        menu.push({food: currentOrder.food, totalCost})
      }
      return menu;
    }, []);
    return menu;
  }

  returnFoodPrice(food) {
    const price = this.orders.find(order => order.food === food).totalCost;
    return price.toFixed(2);
  }

  addOrder(order) {
    this.orders.push(order);
  }

  removeOrder(userId, order) {
    
  }
}

export default Orders;