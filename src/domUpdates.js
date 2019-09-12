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
  }

}

export default domUpdates;