class Rooms {
  constructor(date, rooms, bookings) {
    this.date = date;
    this.rooms = rooms;
    this.bookings = bookings;
    console.log();
  }

  returnMostPopularBookingDate() {
    let mostPopularDate = '';
    let max = 0;
    this.bookings.forEach(booking => {
      const numBookings = this.bookings.filter(book => book.date === booking.date).length;
      if(numBookings > max) {
        max = numBookings;
        mostPopularDate = booking.date;
      }
    });
    return mostPopularDate;
  }

  returnDayWithMostBookingsAvail() {
    let upcomingBookings = this.returnUpcomingBookings();
    let max = 0;
    let date = '';
    upcomingBookings.forEach(booking => {
      let numBookings = this.bookings.filter(book => book.date === booking.date).length;
      if(50 - numBookings > max) {
        max = 50 - numBookings;
        date = booking.date;
      }
    });
    return {bookingsAvail: max, date: date};
  }

  returnUpcomingBookings() {
    let splitDate = this.date.split('/');
    splitDate = splitDate.map(date => parseInt(date));
    let upcomingBookings = this.bookings.filter(booking => {
      let bookingSplitDate = booking.date.split('/');
      bookingSplitDate = bookingSplitDate.map(date => parseInt(date));
      if(bookingSplitDate[0] >= splitDate[0] && (bookingSplitDate[1] > splitDate[1] || (bookingSplitDate[1] === splitDate[1] && bookingSplitDate[2] > splitDate[2]))) {
        return true;
      } else {
        return false;
      }
    });
    return upcomingBookings;
  }

  returnRoomsAvailableOnDate(date) {
    let roomsBooked = this.bookings.filter(booking => booking.date === date);
    roomsBooked = roomsBooked.reduce((rooms, currentBooking) => {
      rooms.push(currentBooking.roomNumber);
      return rooms;
    }, []);
    return this.rooms.filter(room => !roomsBooked.includes(room.number));
  }

  returnPercentBooked() {
    let numBookingsToday = this.returnNumBookingsToday();
    return (numBookingsToday / 50).toFixed(2) * 100;
  }

  returnNumBookingsToday() {
    return this.bookings.filter(booking => booking.date === this.date).length;
  }

  returnNumRoomsAvailable() {
    return 50 - this.returnNumBookingsToday();
  }

  returnTodaysRevenue() {
    let todaysBookings = this.bookings.filter(booking => booking.date === this.date);

    const revenue = todaysBookings.reduce((totalRevenue, booking) => {
      const cost = this.rooms.find(room => room.number === booking.roomNumber).costPerNight;
      totalRevenue += cost;
      return totalRevenue;
    }, 0);
    return revenue.toFixed(2);
  }

  returnUserBookingToday(userID) {
    const currentBooking =  this.bookings.filter(booking => {
      if(booking.date === this.date && booking.userID === userID) {
        return true;
      } else {
        return false;
      }
    });

    return currentBooking[0];
  }

  returnAllUserBookings(userId) {
    return this.bookings.filter(booking => booking.userID === userId);
  }

}

export default Rooms;