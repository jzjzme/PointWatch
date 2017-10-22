import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { stringify } from 'query-string'
import { Page, Card, CardGroup, Loading, PillButton, PillInput } from 'components'
import { clientID, clientSecret } from 'utils'
import cardImage from "../../img/platinum-card.png"
import cardImage2 from "../../img/sgairlines.png"
import styles from "./styles.scss"

@inject('store') @observer
export default class PointsDashboard extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    const { access_token, refresh_token } = await this.authorize() // eslint-disable-line
    // console.log('ACCESS TOKEN: ', access_token)
    const { bank } = this.props.store
    await bank.getRewardsAccounts()
    this.setState({ loading: false })
  }

  async authorize () {
    const { location: { search } } = this.props
    const queryParams = stringify({
      code: new URLSearchParams(search).get('code'),
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/points-dashboard'
    })

    try {
      const data = await fetch(`https://api-sandbox.capitalone.com/oauth2/token?${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(res => res.json())
      return data
    } catch (e) {
      console.log('ERROR: ', e)
    }
    // curl //   -i -k --tlsv1 //   -H "Content-Type:application/x-www-form-urlencoded" //   -d "code=4cb656c112df460cb4821cf7787c553b&client_id=enterpriseapi-sb-tJOw55ype3LktRNB5zY7oIHq&client_secret=175384eb1888f2dded491e8d7242398f0c5901db&grant_type=authorization_code&redirect_uri=https://developer.capitalone.com/products/playground" //   -X POST https://api-sandbox.capitalone.com/oauth2/token
  }

  selectRewardsAccount (displayName) {
    this.setState({ selectedRewardsAccount: displayName })
  }

  setPointsToSell (number) {
    this.setState({pointsToSell: number})
  }
  selectRewardsAccount (displayName2) {
    this.setState({ selectedRewardsAccount: displayName2 })
  }

  setPointsToSell (number2) {
    this.setState({pointsToSell: number2})
  }

  pointsToSell = 0

  render () {
    const { rewardsAccountsDetails } = this.props.store.bank
    const { selectedRewardsAccount, pointsToSell } = this.state
    if (this.state.loading) return <Loading />
    return (
      <Page>
        <div className={styles.searchHeader}> 
          <CardGroup>
            <Card>
              <h1>Your Rewards</h1>
              <p>Your Dashboard is where you can view your points, redeem them for offers, or sell them.</p>
            </Card>
            <Card>
              {rewardsAccountsDetails.map(({ accountDisplayName, rewardsBalance }) => {
                if (accountDisplayName === selectedRewardsAccount) {
                  return (
                    <div>
                      <div className={styles.tabs}>
                        <div className={`${styles.tab} ${styles.sActive}`}>Sell</div>
                        <div className={styles.tab}>Redeem</div>
                      </div>
                      <div key={accountDisplayName} className={styles.cardColWrap}>
                        <img src={cardImage} className={styles.cardImage} />
                        <div className={styles.cardCol1}>
                          { !pointsToSell &&
                            <label className={styles.label}>How many points would you like to sell?</label>
                          }
                          { pointsToSell &&
                            <label className={styles.label}>You can make <span className={styles.points}>${Math.round(pointsToSell * 1.5) / 100}</span>!</label>
                          }
                          <PillInput
                            placeholder={`Out of ${rewardsBalance}`}
                            value={pointsToSell || rewardsBalance}
                            onChange={({ target: { value } }) => {
                              this.setPointsToSell(value)
                            }} />
                        </div>
                        <div className={styles.cta}>
                          <PillButton disabled={!pointsToSell} to={`/points-dashboard/sell-points?points=${pointsToSell || rewardsBalance}`}>Sell {pointsToSell} Points</PillButton>
                        </div>
                      </div>
                    </div>
                  )

                } else {
                  return (
                    <div key={accountDisplayName} className={styles.cardColWrap}>
                      <img src={cardImage} className={styles.cardImage} />
                      <div className={styles.cardCol1}>
                        <h2 className={styles.pointsAvailable}>{accountDisplayName}</h2>
                        <label className={styles.label}><span className={styles.points}>{rewardsBalance}</span> Points Available</label>
                        <label className={styles.label}><span className={styles.points}>5000</span> Points in Market</label>
                        <label className={styles.label}>EXPIRING SOON!</label>
                        <div className={styles.keyline} />
                      <PillButton className={styles.usePointsButton} onClick={() => this.selectRewardsAccount(accountDisplayName)}>Use Points Now!</PillButton>
                      </div>
                    </div>
                  )
                }
              })}
            </Card>
            <Card>
              {rewardsAccountsDetails.map(({ accountDisplayName, rewardsBalance }) => {
                if (accountDisplayName === "Singapore KrisFlyer Miles *4734") {
                  return (
                    <div>
                      <div className={styles.tabs}>
                        <div className={`${styles.tab} ${styles.sActive}`}>Sell</div>
                        <div className={styles.tab}>Redeem</div>
                      </div>
                      <div key={accountDisplayName} className={styles.cardColWrap}>
                        <img src={cardImage2} className={styles.cardImage} />
                        <div className={styles.cardCol1}>
                          { !pointsToSell &&
                            <label className={styles.label}>How many points would you like to sell?</label>
                          }
                          { pointsToSell &&
                            <label className={styles.label}>You can make <span className={styles.points}>${Math.round(pointsToSell * 1.5) / 100}</span>!</label>
                          }
                          <PillInput
                            placeholder={`Out of ${rewardsBalance}`}
                            value={pointsToSell || rewardsBalance}
                            onChange={({ target: { value } }) => {
                              this.setpointsToSell(value)
                            }} />
                        </div>
                        <div className={styles.cta}>
                          <PillButton disabled={!pointsToSell} to={`/points-dashboard/sell-points?points=${pointsToSell || rewardsBalance}`}>Sell {pointsToSell} Points</PillButton>
                        </div>
                      </div>
                    </div>
                  )

                } else {
                  return (
                    <div key={accountDisplayName} className={styles.cardColWrap}>
                      <img src={cardImage2} className={styles.cardImage} />
                      <div className={styles.cardCol1}>
                        <h2 className={styles.pointsAvailable}>{accountDisplayName}</h2>
                        <label className={styles.label}><span className={styles.points}>{rewardsBalance}</span> Points Available</label>
                        <div className={styles.keyline} />
                      <PillButton className={styles.usePointsButton} onClick={() => this.selectRewardsAccount(accountDisplayName)}>Use Points Now!</PillButton>
                      </div>
                    </div>
                  )
                }
              })}
            </Card>            
          </CardGroup>
        </div>
      </Page>
    )
  }
}