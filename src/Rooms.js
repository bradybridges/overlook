class Rooms {
  constructor(date, rooms, bookings) {
    this.date = date;
    this.rooms = rooms;
    this.bookings = bookings;
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

}

export default Rooms;