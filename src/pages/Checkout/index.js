import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Page, Card, CardGroup, PillButton, PillInput } from 'components'
import moment from "moment"
import styles from "../Flights/styles.scss"

@inject('store') @observer
export default class Checkout extends Component {

  getFlight () {
    const { store, match } = this.props
    const { searchResults } = store.flight
    const id = match.params.id

    return searchResults.find((el) => {
      if (el.id === id) {
        return el
      }
    })
  }

  render () {
    const {id, departs_at, arrives_at, price} = this.getFlight()

    return (
      <Page>
        <div className={styles.searchHeader}>
          <CardGroup>
            <h1 className={styles.header}>Flight to Singapore Changi Airport</h1>
            <div className={styles.keyline} />
            <div className={styles.searchDetails}>
              <div className={styles.data}>
                <label>Date</label>
                <div>{moment(departs_at).format("MMMM Do, YYYY")}</div>
              </div>
              <div className={styles.data}>
                <label>Departs At</label>
                <div>{moment(departs_at).format('LT')}</div>
              </div>
              <div className={styles.data}>
                <label>Arrives At</label>
                <div>{moment(arrives_at).format('LT')}</div>
              </div>
              <div className={styles.data}>
                <label>Price</label>
                <div>{price}</div>
              </div>
            </div>
          </CardGroup>
        </div>

        <CardGroup className={styles.passengerInfo}>
          <Card>
            <h1>Passenger Information</h1>
            <div className={styles.inputGroup}>
              <PillInput placeholder="First Name" className={styles.input}/>
              <PillInput placeholder="Last Name" className={styles.input}/>
            </div>

            <div className={styles.inputGroup}>
              <PillInput placeholder="Email" type="email" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <PillInput placeholder="Date of Birth" type="date" className={styles.input} />
              <select placeholder="gender" className={`${styles.input} ${styles.mSelect}`}>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </Card>
          <PillButton className={styles.checkoutButton} to="/">Checkout with Visa</PillButton>
        </CardGroup>
      </Page>
    )
  }
}
