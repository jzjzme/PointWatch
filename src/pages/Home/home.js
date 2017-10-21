import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Page, Navigation, PillButton, PillInput } from 'components'
import styles from "./styles.scss"

const Home = observer(({ store: { user, flight }, history }) => (
  <Page>
    <Navigation />
    <section className={styles.splash}>
      <div className={styles.splashCopy}>
        <h1 className={styles.header}>This is some marketing gibberish that spans two lines.</h1>
        <h2 className={styles.subHeader}>This is the subheader that nobody reads everrrrrr.</h2>
      </div>
      <div className={styles.searchWrapper}>
        <PillInput
          className={styles.input}
          placeholder="Pick a place"
          onChange={({ target: { value } }) => flight.location = value}
          value={flight.location} />
        
        <PillInput
          className={styles.input}
          placeholder="Choose a date"
          onChange={({ target: { value } }) => flight.date = value}
          value={flight.date} />

        <PillButton onClick={() => {
          flight.search()
          history.push('/flights')
        }}>Find Flights</PillButton>
      </div>
    </section>
  </Page>
))

export default inject('store')(withRouter(Home))