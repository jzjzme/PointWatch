import { observable } from 'mobx'
import UserStore from './UserStore'
import FlightStore from './FlightStore'


class AppStore {
  @observable loading = true

  constructor () {
    this.user = new UserStore()
    this.flight = new FlightStore()
    setTimeout(() => {
      this.loading = false
    }, 2000);
  }
}


const store = window.store = new AppStore()
export default store