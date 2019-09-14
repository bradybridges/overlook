import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import domUpdates from './domUpdates';
import eventListeners from './eventListeners';
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
  },500);

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
    if(e.target.classList.contains('search-result')) {
      const name = $(e.target).text();
      domUpdates.resetCustomerSearch();
      domUpdates.resetOrders();
      domUpdates.resetRooms();
      domUpdates.appendSelectedUserData(name, hotel);
      domUpdates.appendUserRoomData(name, hotel);
    }
  });
});



 
