import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import domUpdates from './domUpdates';
import eventListeners from './eventListeners';
import Admin from './Admin';
import Hotel from './Hotel';

let hotel;
const data = [];
const date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');

// const fetchData = () => {
//   const urls = ["https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users", "https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms", "https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", "https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices"];
//   const requests = urls.map(url => 
//     fetch(url).then(response => response.json())
//     .then(response => data.push(response))
//   );
// };

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
});

$(document).ready(() => {
  setTimeout(function() {
    domUpdates.updateHome(date, hotel.admin);
    console.log(hotel.data.users);
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

  $('#new-customer-btn').click(() => {
    domUpdates.showNewCustomerPage();
  })
});



 
