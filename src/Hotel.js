import Admin from './Admin';
class Hotel {
  constructor (data, date) {
    this.data = data;
    this.admin = new Admin(data, date)
  }
}

export default Hotel;