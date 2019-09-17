import $ from 'jquery';
const domUpdates = {
  updateHome(date, hotel) {
    const totalRevenue = parseFloat(hotel.rooms.returnTodaysRevenue() + hotel.orders.returnOrderRevenueToday()).toFixed(2);
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
    $('#search-results').append(`<p class="search-result" data-id=${customer.id}>${customer.name}</p>`);
  },

  showNewCustomerPage() {
    $('#new-customer-btn').hide();
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
      <p class="order-id">UserID: ${order.userID}</p>
      <p class="order-cost">$${order.totalCost}</p>
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
    $('#most-rooms-avail').text(`${mostBookingsDay.date}: ${mostBookingsDay.bookingsAvail} Available Bookings`);
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

  selectedUserHandler(name, hotel) {
    this.resetCustomers();
    this.resetOrders();
    this.resetRooms();
    hotel.currentCustomer = name;
    this.appendSelectedUserData(name, hotel);
  },

  appendSelectedUserData(name, hotel) {
    let user = hotel.customers.findCustomer(name);
    $('#selected-user').text(`Current Customer: ${name}`).show();
    $('#onload-order-data').hide();
    this.appendSelectedUserOrders(user.id, hotel);
    $('#onload-rooms-data').hide();
    this.appendUserRoomData(name, hotel);
    this.showAddOrderHandler(user.id, hotel);
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
      <div class="order" data-date="${order.date}">
        <p class="order-item">${order.date}</p>
        <p class="order-item">${order.food}</p>
        <p class="order-item">${order.totalCost}</p>
        <span  data-item="${order.food}" class="cancel-order-btn">&times;</span
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

  resetCustomers() {
    $('#search-results').addClass('display-none').children().remove();
    $('#customer-search-input').val('');
    this.clearInputs([$('#first-name-input'), $('#last-name-input')]);
    $('#new-customer').hide();
    $('#new-customer-btn').show();
  },

  resetOrders() {
    $('.order').remove();
    $('#no-orders-today').remove();
    $('#no-order-history').remove();
    $('#add-order-btn').hide();
    $('#new-order-menu').hide();
  },

  appendUserRoomData(name, hotel) {
    const userID = hotel.customers.findCustomer(name).id;
    this.appendBookingToday(userID, hotel);
    this.appendBookingHistory(userID, hotel);
    $('#selected-user-rooms').show();
  },

  appendBookingToday(userID, hotel) {
    const bookingToday = hotel.rooms.returnUserBookingToday(userID);
    if(bookingToday) {
      const element = `<p id='today-booking-p' data-room='${bookingToday.roomNumber}' class='booking-item'>Room ${bookingToday.roomNumber}`;
      $('#todays-booking').append(element);
      $('#cancel-booking-btn').show();
    } else {
      const element = `
        <p id="no-booking" class="booking-item">No booking for user today</p>
      `;
      $('#todays-booking').append(element);
      $('#new-booking-btn').show();
    }
  },

  showAddOrderHandler(userID, hotel) {
    const bookingToday = hotel.rooms.returnUserBookingToday(userID);
    if(bookingToday) {
      $('#add-order-btn').show();
    }
  },

  appendBookingHistory(userID, hotel) {
    const allBookingData = hotel.rooms.returnAllUserBookings(userID);
    if(allBookingData.length > 0){
      allBookingData.forEach(booking => this.appendBooking(booking));
    } else {
      $('#booking-history').append('<p id="no-booking-history" class="booking-item">No Booking History For User</p>');
    }
  },

  appendBooking(booking) {
    const element = `
      <div class='booking'>
        <p class='booking-item'>${booking.date}</p>
        <p class='booking-item'>Room Number: ${booking.roomNumber}</p>
      </div>
    `;
    $('#booking-history').append(element);
  },

  resetRooms() {
    $('.booking-item').remove();
    $('.booking').remove();
    $('#cancel-booking-btn').hide();
  },

  createCustomer(hotel) {
    const firstName = $('#first-name-input').val();
    const lastName = $('#last-name-input').val();
    const status = hotel.customers.createCustomer(firstName, lastName);
    if(status) {
      alert('customer created...');
      $('#new-customer').fadeOut(250);
      $('#new-customer-btn').show();
      this.clearInputs([$('#first-name-input'), $('#last-name-input')]);
    } else {
      alert('customer already exists...');
      this.clearInputs([$('#first-name-input'), $('#last-name-input')]);
    }
  },

  clearInputs(inputArray) {
    inputArray.forEach(input => input.val(''));
  },

  appendAvailableBookings(roomsAvail, hotel) {
    if(roomsAvail.length > 0) {
      roomsAvail.forEach(room => this.appendAvailableRoom(room));
    } else {
      const date = hotel.rooms.date;
      const availableRooms = hotel.rooms.returnRoomsAvailableOnDate(date);
      availableRooms.forEach(room => this.appendAvailableRoom(room));
    }
  },

  appendAvailableRoom(room) {
    const element = `
      <div class='available-booking'>
        <p class='room-item' data-roomnum='${room.number}'>Room Number: ${room.number}</p>
        <p class='room-item'>Type: ${room.roomType}</p>
        <p class='room-item'>Has Bidet: ${room.bidet}</p>
        <p class='room-item'>Cost Per night: $${room.costPerNight}</p>
        <button class='book-btn'>Book</button>
      </div>`;
    $('#new-booking').append(element);
  },

  newBookingHandler(hotel, e) {
    const currentUserName = hotel.currentCustomer;
    const userID = hotel.customers.findCustomer(currentUserName).id;
    let roomNumber = parseInt($(e.target).closest('.available-booking').children()[0].dataset.roomnum); 
    hotel.rooms.bookRoom(userID, roomNumber);
    console.log(hotel.rooms.bookings[hotel.rooms.bookings.length - 1]);
  },

  postBookingDomUpdates(name, hotel) {
    this.removePostBookingExtraData();
    this.appendSelectedUserData(name, hotel);
    $('#todays-booking').show();
    $('#booking-history').show();
  },

  removePostBookingExtraData() {
    $('.available-booking').remove();
    $('#new-booking').hide();
    $('#no-booking').remove();
    $('#new-booking-btn').hide();
    $('#no-orders-today').remove();
    $('#no-order-history').remove();
    $('#no-booking-history').remove();
  },

  appendMenuOption(item) {
    const element = `<option data-price='${item.price}' value="${item.food}">${item.food} - $${item.totalCost}</option>`;
    $('#order-select').append(element);
  },

}

export default domUpdates;