class Admin {
  constructor(data, date) {
    this.data = data;
    this.date = date;
  }

  returnPercentBooked() {
    let numBookingsToday = this.returnNumBookingsToday();
    return (numBookingsToday / 50).toFixed(2) * 100;
  }

  returnNumBookingsToday() {
    return this.data.bookings.filter(booking => booking.date === this.date).length;
  }

  returnNumRoomsAvailable() {
    return 50 - this.returnNumBookingsToday();
  }

  returnTodaysRevenue() {
    let todaysBookings = this.data.bookings.filter(booking => booking.date === this.date);

    const revenue = todaysBookings.reduce((totalRevenue, booking) => {
      const cost = this.data.rooms.find(room => room.number === booking.roomNumber).costPerNight;
      totalRevenue += cost;
      return totalRevenue;
    }, 0);
    return revenue.toFixed(2);
  }

}

export default Admin;