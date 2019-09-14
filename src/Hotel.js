import Orders from './Orders';
import Rooms from './Rooms';
import Customers from './Customers';
class Hotel {
  constructor (data, date) {
    this.data = data;
    this.orders = new Orders(date, this.data.roomServices);
    this.rooms = new Rooms(date, this.data.rooms, this.data.bookings);
    this.customers = new Customers(this.data.users);
  }
}

export default Hotel;