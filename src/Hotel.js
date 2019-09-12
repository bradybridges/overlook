import Admin from './Admin';
import Orders from './Orders';
class Hotel {
  constructor (data, date) {
    this.data = data;
    this.admin = new Admin(data, date);
    this.orders = new Orders(date, this.data.roomServices);
  }
}

export default Hotel;