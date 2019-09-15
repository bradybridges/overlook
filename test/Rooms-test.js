const chai = require('chai');
const expect = chai.expect;
const roomData = require('./mockData/mockRoomData');
const bookingData = require('./mockData/mockBookingData');
import Rooms from '../src/Rooms';

describe('Rooms', () => {
  const date = "2019/10/19";
  let rooms = new Rooms(date, roomData.rooms, bookingData.bookings);

   it('should be a function', function() {
    expect(Rooms).to.be.a('function');
  });

  it('should be an instance of Rooms', function() {
    expect(rooms).to.be.an.instanceof(Rooms);
  });

  describe('returnMostPopularBookingDate', () => {
    it('should return most popular booking date', () => {
      expect(rooms.returnMostPopularBookingDate()).to.equal("2019/10/19");
    });
  });

  describe('returnDayWithMostBookingsAvail', () => {
    it('should return day with most bookings avail', () => {
      expect(rooms.returnDayWithMostBookingsAvail()).to.deep.equal({ bookingsAvail: 48, date: '2019/10/26' });
    });
  });

  describe('returnUpcomingBookings', () => {
    it('should return upcoming bookings', () => {
      expect(rooms.returnUpcomingBookings().length).to.equal(2);
    });
  });

  describe('returnRoomsAvailableOnDate', () => {
    it('should return rooms avail on date', () => {
      expect(rooms.returnRoomsAvailableOnDate('2019/10/26').length).to.equal(8);
    });
  });

  describe('returnRoomsAvailableOfType', () => {
    it('should return rooms avail on date of type', () => {
      expect(rooms.returnRoomsAvailableOfType('2019/10/19', 'suite').length).to.equal(2);
    });
  });

  describe('returnPercentBooked', () => {
    it('should return percentage booked for current date', () => {
      expect(rooms.returnPercentBooked()).to.equal(8);
    });
  });

  describe('returnNumBookingsToday', () => {
    it('should return number of bookings today', () => {
      expect(rooms.returnNumBookingsToday()).to.equal(4);
    });
  });

  describe('returnNumRoomsAvailable', () => {
    it('should return number of vacant rooms', () => {
      expect(rooms.returnNumRoomsAvailable()).to.equal(46);
    });
  });

  describe('returnTodaysRevenue', () => {
    it('should return room revenue for day', () => {
      expect(rooms.returnTodaysRevenue()).to.equal('946.06');
    });
  });

  describe('returnUserBookingToday', () => {
    it('should return a users booking for todays date', () => {
      expect(rooms.returnUserBookingToday(4).roomNumber).to.equal(5);
    });
  });

  describe('returnAllUserBookings', () => {
    it('should return users bookings for all time', () => {
      expect(rooms.returnAllUserBookings(4).length).to.equal(2);
    })
  });

});


