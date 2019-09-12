import $ from 'jquery';
const domUpdates = {
  updateHome(date, admin) {
    $('#home-date').text(date);
    $('#percent-booked').text(`${admin.returnPercentBooked()}% Of Rooms Filled`);
    $('#num-rooms-avail').text(`${admin.returnNumRoomsAvailable()} Rooms Available`);
    $('#revenue').text(`$${admin.returnTodaysRevenue()}`);
  },

  updateSearchResults(searchValue, users) {
    $('#search-results').children().remove();
    let results = users.filter(user => user.name.toLowerCase().includes(searchValue));
    if(results.length > 0) {
      results.forEach(customer => this.appendSearchResult(customer));
    } else {
      this.appendSearchResult({name: 'No Customers Found', id: null});
    }
    
  },

  appendSearchResult(customer) {
    $('#search-results').append(`<p class="search-result" dataset-id=${customer.id}>${customer.name}</p>`);
  },

  showNewCustomerPage() {
    $('#new-customer').fadeIn(250);
  },

  appendAllRoomServiceOrders(date, hotel) {
    const orders = hotel.orders.returnTodaysOrders();
    this.appendAllTimeOrderRevenue(hotel);
    this.appendOrdersRevenueToday(hotel);
    orders.forEach(order => this.appendOrder(order));
  },

  appendOrder(order) {
    const orderElement = `<div class="order">
      <p class="order-item">${order.food}</p>
      <p class="order-cost">${order.totalCost}</p>
      <p class="order-id">${order.userID}</p>
      </div>`;
    $('#orders-container').append(orderElement);
  },

  appendOrdersRevenueToday(hotel) {
    const revenue = hotel.orders.returnOrderRevenueToday();
    $('#orders-container').append(`<h3>Today's Room Service Revenue: $${revenue}</h3>`);
  },

  appendAllTimeOrderRevenue(hotel) {
    const revenue = hotel.orders.returnTotalOrderRevenueAllTime();
    $('#orders-container').append(`<h3>Total Room Service Revenue: $${revenue}</h3>`);
  }

}

export default domUpdates;