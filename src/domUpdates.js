import $ from 'jquery';
const domUpdates = {
  updateHome(date, hotel) {
    const totalRevenue = parseFloat(hotel.rooms.returnTodaysRevenue() + hotel.orders.returnOrderRevenueToday());
    $('#home-date').text(date);
    $('#percent-booked').text(`${hotel.rooms.returnPercentBooked()}% Of Rooms Filled`);
    $('#num-rooms-avail').text(`${hotel.rooms.returnNumRoomsAvailable()} Rooms Available`);
    $('#revenue').text(`$${totalRevenue}`);
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
    if(orders.length > 0) {
      orders.forEach(order => this.appendOrder(order));
    } else {
      $('#orders-container').append('<h2> No Orders Today</h2>');
    }
    
  },

  appendOrder(order) {
    const orderElement = `<div class="order">
      <p class="order-item">${order.food}</p>
      <p class="order-cost">$${order.totalCost}</p>
      <p class="order-id">UserID: ${order.userID}</p>
      </div>`;
    $('#orders-container').append(orderElement);
  },

  appendOrdersRevenueToday(hotel) {
    const revenue = hotel.orders.returnOrderRevenueToday();
    $('#todays-service-revenue').text(`Today's Room Service Revenue: $${revenue}`);
  },

  appendAllTimeOrderRevenue(hotel) {
    const revenue = hotel.orders.returnTotalOrderRevenueAllTime();
    $('#total-service-revenue').text(`Total Room Service Revenue: $${revenue}`);
  },

  appendRoomData(hotel) {
    this.appendMostPopularBookingDate(hotel);
    this.appendDayWithMostBookings(hotel);
  },

  appendMostPopularBookingDate(hotel) {
    const mostPopularDate = hotel.rooms.returnMostPopularBookingDate();
    $('#most-popular-booking-day').text(mostPopularDate);
  },

  appendDayWithMostBookings(hotel) {
    const mostBookingsDay = hotel.rooms.returnDayWithMostBookingsAvail();
    $('#most-rooms-avail').text(`Date: ${mostBookingsDay.date} --- Rooms Avail: ${mostBookingsDay.bookingsAvail}`);
  },

  appendRoomSearchResults(results) {
    results.forEach(room => this.appendRoomResult(room));
  },

  appendRoomResult(room) {
    const element = `
      <div class="room-search-result">
        <p class="room-data">Room Number: ${room.number}</p>
        <p class="room-data">Room Type: ${room.roomType}</p>
        <p class="room-data">Bedsize: ${room.bedSize}</p>
        <p class="room-data">Number Of Beds: ${room.numBeds}</p>
        <p class="room-data">Bidet Included: ${room.bidet}</p>
        <p class="room-data">Cost Per Night: ${room.costPerNight}</p>
      </div>
    `;
    $('#room-search-results').append(element);
  },

  appendSelectedUserData(name, hotel) {
    let user = hotel.customers.findCustomer(name);
    console.log(user);
    $('#selected-user').text(`Current Customer: ${name}`);
    $('#onload-order-data').hide();
    this.appendSelectedUserOrders(user.id, hotel);
  },

  appendSelectedUserOrders(userID, hotel) {
    const allTimeOrders = hotel.orders.findUserOrdersAllTime(userID);
    const todaysOrders = hotel.orders.findUserOrdersToday(userID);
    this.appendTodaysOrders(todaysOrders);
    this.appendAllTimeOrders(allTimeOrders);
  },

  appendTodaysOrders(orders) {
    if(orders.length > 0){
      orders.forEach(order => this.appendTodayOrder(order)); 
    } else {
      $('#todays-orders').append('<h4 id="no-orders-today">No Orders Today!</h4>');
    }
    
    $('#selected-user-orders').show();
  },

  appendTodayOrder(order) {
    const element = `
      <div class="order">
        <p class="order-item">${order.date}</p>
        <p class="order-item">${order.food}</p>
        <p class="order-item">${order.totalCost}</p>
      </div>`;
    $('#todays-orders').append(element);
  },

  appendAllTimeOrders(orders) {
    if(orders.length > 0) {
      orders.forEach(order => this.appendAllTimeOrder(order));
    } else {
      $('#all-time-orders').append('<h4 id="no-order-history"> User has never ordered</h4>');
    }
  },

  appendAllTimeOrder(order) {
    const element = `
      <div class="order">
        <p class="order-item">${order.date}</p>
        <p class="order-item">${order.food}</p>
        <p class="order-item">${order.totalCost}</p>
      </div>`;
    $('#all-time-orders').append(element);
  },

  resetCustomerSearch() {
    $('#search-results').addClass('display-none').children().remove();
    $('#customer-search-input').val('');
  },

  resetOrders() {
    $('.order').remove();
    $('#no-orders-today').remove();
  }

}

// bedSize: "twin"
// bidet: false
// costPerNight: 265.03
// numBeds: 1
// number: 1
// roomType: "residential suite"

export default domUpdates;