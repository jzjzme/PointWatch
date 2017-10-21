import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { stringify } from 'query-string'
import { Page, Navigation as Navbar } from 'components'
import { clientID, clientSecret } from 'utils'


@observer
export default class PointsDashboard extends Component {
  async componentDidMount() {
    const { access_token, refresh_token } = await this.authorize()
    console.log('ACCESS TOKEN: ', access_token)
    // const { rewardsAccounts } = await this.getRewardsAccounts(access_token)
    await this.getRewardsAccounts(access_token)
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

  async getRewardsAccounts (token) {
    try {
      const data = await fetch('https://api-sandbox.capitalone.com/rewards/accounts', {
        mode: 'no-cors',
        headers: {
          'Authorization': `Bearer ${token}`

        }
      })
      console.log('RES: ', data);
      // .then(res => {
      //   console.log('RES: ', res);
      //   return res.json()
      // })
      // console.log('DATA: ', data)
      // return data
    } catch (e) {
      console.log('ERROR IN GET REWARDS: ', e)
    }
    // curl
    //   -i -k --tlsv1 -H "Accept: application/json;v=1"
    //   -H "Authorization:Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwicGNrIjoxLCJhbGciOiJkaXIiLCJ0diI6Miwia2lkIjoiYTdxIn0..HMUTg9ujCcwun-gW-o8P-w.KOkHhPyLrvcGslqkH9rT7X4gGFOPaSjhAGjzQINYWkzjybIAdNbWBMIGRXC6dy5Vx9VI9iKBhBHv_PcqOr4Qh8YClTtJ5Oqc36922Y8ZGIBciRfdf1X4T6-uQESjy15_FUyWJPISRck6TmqkjDr_zwvYzyb6bZwdlLYW1SDE9aqPdz1odZOXkaqak4ot0MsRQwXDWVVHxqjyzTGbHyxVZKuj4PYIM7VMfEmVuDvshY2JeAUPl01kaykLvjnm1T1Z9OXg2jEbwp9g6egGuwKE8Eey_-x0Y9ZUV7LTHZ9Rw4Ee6TD8cohVzQYD2RafYAglyaZBvYIeEW0WM8NERg2o2LtvQagOaI2RtQrx7B0hmTe7mT9nqutat2lYb6LlfyLXTUKM6fZDXOSgV9g2Y9OL8Fscws5Cwfct-5ae2P-gUn8GW3OkPapCKg_XQQCIiJbH0DSZWGylsREEj9A4C7xEQRjTPdaJcXwL_sUic5I__dbNFtFlKX5gCq8qkseTDX1p.wTSKWYctfeozFDTNooigrg"
    //   -X GET "https://api-sandbox.capitalone.com/rewards/accounts"
  }

  render () {
    const { location: { search } } = this.props
    return (
      <Page>
        <Navbar />
        <h1>The CapitalOne Code: <code>{new URLSearchParams(search).get('code')}</code></h1>
        WELCOME TO THE POINTS DASHBOARD :p
      </Page>
    )
  }
}