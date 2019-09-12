import $ from 'jquery';
const domUpdates = {
  updateHome(date, admin) {
    $('#home-date').text(date);
    $('#percent-booked').text(`${admin.returnPercentBooked()}%`);
    $('#num-rooms-avail').text(`${admin.returnNumRoomsAvailable()} Rooms Available`);
    $('#revenue').text(`$${admin.returnTodaysRevenue()}`);
  },
}

export default domUpdates;