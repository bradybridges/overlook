import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';

let data = [];

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

fetchData();
setTimeout(function() {
  data = formatData();
  console.log(data);
  
},500);



 
