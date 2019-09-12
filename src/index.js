import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import domUpdates from './domUpdates';
import eventListeners from './eventListeners';
import Admin from './Admin';

let data = [];
const date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');

const fetchData = () => {
  const urls = ["https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users", "https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms", "https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", "https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices"];
  const requests = urls.map(url => 
    fetch(url).then(response => response.json())
    .then(response => data.push(response))
  );
};

const formatData = () => {

  const result = data.reduce((formattedData, dataset) => {
    const key = Object.keys(dataset)[0];
    formattedData[key] = dataset[key];
    return formattedData;
  }, {});
  return result;
}

$(document).ready(() => {
  fetchData();
  setTimeout(function() {
    data = formatData();
    console.log(data);
    const admin = new Admin(data, date);
    domUpdates.updateHome(date, admin);
  /////////////
  },500);
});



 
