import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { stringify } from 'query-string'
import { Page, Card, CardGroup, Loading } from 'components'
import { clientID, clientSecret } from 'utils'
import styles from "./styles.scss"

@observer @inject('store')
export default class PointsDashboard extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    const { access_token, refresh_token } = await this.authorize()
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

  render () {
    const { rewardsAccountsDetails } = this.props.store.bank
    if (this.state.loading) return <Loading />
    return (
      <Page>
        <CardGroup>
          <Card>
            <h1>Welcome to your dashboard!</h1>
            <p>This is where you can view and sell the points you have available.</p>
          </Card>
          <Card>
            {rewardsAccountsDetails.map(({ accountDisplayName, rewardsBalance }) => (
              <div key={accountDisplayName}>
                <div>Your account <b>{accountDisplayName}</b> has <b>{rewardsBalance}</b> points available</div>
              </div>
            ))}
          </Card>
        </CardGroup>
      </Page>
    )
  }
}