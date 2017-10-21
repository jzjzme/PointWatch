import React from 'react'
import { Page, PillButton, Navigation as Navbar } from 'components'
import { clientID } from 'utils'
import capitalOneLogo from "../../img/capital-one-logo.png"

import styles from "./styles.scss"

const redirectURL = 'http://localhost:3000/points-dashboard'
const capitalOneLoginURL = `https://api-sandbox.capitalone.com/oauth2/authorize?redirect_uri=${redirectURL}&scope=read_rewards_account_info&client_id=${clientID}&response_type=code`

const Login = () => (
  <Page>
    <Navbar />
    <PillButton
      capitalOne={true}
      onClick={() => window.location = capitalOneLoginURL}>
      <img src={capitalOneLogo} alt="Capital One Logo" className={styles.capLogo} />
      Log In
    </PillButton>
  </Page>
)

export default Login