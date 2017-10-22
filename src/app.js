import React from 'react';
import { Provider as MobxProvider, observer } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home, Flights, Checkout, Login, PointsDashboard, SellPoints } from './pages'
import { Loading } from 'components'
import { AppLayout } from './layouts'


export const App = observer(({ store }) => store.loading ? <Loading /> : (
  <MobxProvider store={store}>
    <Router>
      <Switch>
        <AppLayout exact path='/' component={Home} />
        <AppLayout exact path='/flights' component={Flights} />
        <AppLayout path='/flights/book/:id' component={Checkout} />
        <AppLayout path='/login' component={Login} />
        <AppLayout exact path='/points-dashboard' component={PointsDashboard} />
        <AppLayout path='/points-dashboard/sell-points' component={SellPoints} />
      </Switch>
    </Router>
  </MobxProvider>
))