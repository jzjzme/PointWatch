import React from 'react'
import { Page, PillButton, Card, CardGroup } from 'components'
import { clientID } from 'utils'
import capitalOneLogo from "../../img/capital-one-logo.png"

import styles from "./styles.scss"

const redirectURL = 'http://localhost:3000/points-dashboard'
const capitalOneLoginURL = `https://api-sandbox.capitalone.com/oauth2/authorize?redirect_uri=${redirectURL}&scope=read_rewards_account_info&client_id=${clientID}&response_type=code`

const Login = () => (
  <Page>
    <div className={styles.wrapper}>
      <CardGroup>
        <Card>
          <h1>Let's get started.</h1>
          <h2>Sign up to start selling rewards points for cash!</h2>
          <div className={styles.keyline} />
          <PillButton
            capitalOne={true}
            className={styles.button}
            onClick={() => window.location = capitalOneLoginURL}>
            Sign in with
            <img src={capitalOneLogo} alt="Capital One Logo" className={styles.capLogo} />
          </PillButton>
        </Card>
      </CardGroup>
    </div>
  </Page>
)

export default Login