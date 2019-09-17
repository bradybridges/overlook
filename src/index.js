import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import domUpdates from './domUpdates';
import Hotel from './Hotel';

let hotel;
const data = [];
const date = `${new Date().getFullYear()}/${new Date().getMonth() + 1 < 10 ? '0'.concat(new Date().getMonth() + 1) : new Date().getMonth() + 1 < 10}/${new Date().getDate()}`
// new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
const formatData = (data) => {

  const result = data.reduce((formattedData, dataset) => {
    const key = Object.keys(dataset)[0];
    formattedData[key] = dataset[key];
    return formattedData;
  }, {});
  return result;
};

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then(response => response.json()),
]).then(data => {
  hotel = new Hotel(formatData(data), date)
  console.log(hotel.data);
});

$(document).ready(() => {
  setTimeout(function() {
    domUpdates.updateHome(date, hotel);
    domUpdates.appendAllRoomServiceOrders(date, hotel);
    domUpdates.appendRoomData(hotel);
    $('.loader').remove();
  },500);

  $('nav').click((e) => {
  if(e.target.dataset.toggle) {
    const toggleTarget = e.target.dataset.toggle;
    $(e.target).addClass('active-button');
    $(e.target).siblings().removeClass('active-button');
    $(toggleTarget).siblings().hide();
    $(toggleTarget).fadeIn(500);
  } 
  });

  $('#customer-search-input').keyup((e) => {
  const searchValue = $(e.target).val().toLowerCase();
  
  if(searchValue !== '') {
    $('#search-results').removeClass('display-none');
    domUpdates.updateSearchResults(searchValue, hotel.data.users);
  } else {
    $('#search-results').children().remove();
    $('#search-results').addClass('display-none');
  }
  });

  $('#new-customer-btn').click((e) => {
    e.preventDefault();
    domUpdates.showNewCustomerPage();
  });

  $('#search-room-btn').click((e) => {
    e.preventDefault();
    const searchDate = $('#room-search-input').val();
    const results = hotel.rooms.returnRoomsAvailableOnDate(searchDate);
    domUpdates.appendRoomSearchResults(results);
  });

  $('#search-results').click((e) => {
    if(e.target.classList.contains('search-result') && e.target.dataset.id !== 'null') {
      userSelectedDomUpdates(e);
      hotel.currentCustomer = $(e.target).text();
      const userID = hotel.customers.findCustomer(hotel.currentCustomer).id;
      domUpdates.showAddOrderHandler(userID, hotel);
    }
  });

  function userSelectedDomUpdates(e) {
    const name = $(e.target).text();
    domUpdates.selectedUserHandler(name, hotel);
  }

  $('#new-customer').keyup(() => {
    const firstName = $('#first-name-input').val();
    const lastName = $('#last-name-input').val();
    if(firstName !== '' && lastName !== '') {
      $('#create-customer-btn').prop('disabled', false);
    } else {
      $('#create-customer-btn').prop('disabled',true);
    }
  });

  $('#create-customer-btn').click((e) => {
    e.preventDefault();
    domUpdates.createCustomer(hotel);
    const newUsersName = hotel.customers.returnNewestCustomer().name;
    domUpdates.selectedUserHandler(newUsersName, hotel);
  });

  $('#new-booking-btn').click(() => {
    $('#todays-booking').hide()
    $('#booking-history').hide()
    $('#new-booking').show();
  });

  $('#go-btn').click(() => {
    $('.available-booking').remove();
    const type = $('#room-type-select').val();
    let roomsAvail = hotel.rooms.returnRoomsAvailableOfType(date, type);
    domUpdates.appendAvailableBookings(roomsAvail, hotel);
  });

  $('#new-booking').click((e) => {
    if(e.target.classList.contains('book-btn')) {
      const userID = hotel.customers.findCustomer(hotel.currentCustomer).id;
      domUpdates.newBookingHandler(hotel, e);
      domUpdates.postBookingDomUpdates(hotel.currentCustomer, hotel);
      domUpdates.showAddOrderHandler(userID, hotel);
      domUpdates.updateHome(hotel.date, hotel);
    }
  });

  $('#add-order-btn').click((e) => {
    e.preventDefault();
    const menu = hotel.orders.getMenu();
    menu.forEach(item => domUpdates.appendMenuOption(item));
    $('#new-order-menu').slideToggle(500);
  });

  $('#submit-order-btn').click((e) => {
    const order = returnOrderObject();
    hotel.orders.addOrder(order);
    domUpdates.selectedUserHandler(hotel.currentCustomer, hotel);
    domUpdates.updateHome(hotel.date, hotel);
    addCancelOrderEventListener();
  });

  function returnOrderObject() {
    const food = $('#order-select').val();
    const totalCost = parseFloat(hotel.orders.returnFoodPrice(food));
    const userID = hotel.customers.findCustomer(hotel.currentCustomer).id;
    const date = hotel.date;
    return {date, food, totalCost, userID};
  }

  $('#cancel-booking-btn').click(() => {
    const roomNum = parseInt($('#today-booking-p')[0].dataset.room);
    hotel.rooms.cancelBooking(roomNum);
    domUpdates.selectedUserHandler(hotel.currentCustomer, hotel);
  });

  $('#switch-rooms-btn').click(() => {
    const roomNum = parseInt($('#today-booking-p')[0].dataset.room);
    hotel.rooms.cancelBooking(roomNum);
    $('#today-booking-p').remove();
    $('#new-booking').show();
    // domUpdates.selectedUserHandler(hotel.currentCustomer, hotel);
  });

  function addCancelOrderEventListener() {
    $('.cancel-order-btn').click((e) => {
      const userID = hotel.customers.findCustomer(hotel.currentCustomer).id;
      const item = e.target.closest('.order').children[1].innerText;
      hotel.orders.cancelOrder(userID, item);
      e.target.closest('.order').remove();
      domUpdates.updateHome(hotel.date, hotel);
    });
  }

  $('.cancel-order-btn').click((e) => {
    const userID = hotel.customers.findCustomer(hotel.currentCustomer).id;
    const item = e.target.closest('.order').children[1].innerText;
    hotel.orders.cancelOrder(userID, item);
    e.target.closest('.order').remove();
    domUpdates.updateHome(hotel.date, hotel);
  });
});