import Orders from './Orders';
import Rooms from './Rooms';
class Hotel {
  constructor (data, date) {
    this.data = data;
    this.orders = new Orders(date, this.data.roomServices);
    this.rooms = new Rooms(date, this.data.rooms, this.data.bookings);
  }
}

export default Hotel;