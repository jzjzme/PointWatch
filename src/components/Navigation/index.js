
import React, { Component } from "react"
import { Logo, PillButton } from "components"
import { Link } from "react-router-dom"
import styles from "./styles.scss"

export class Navigation extends Component {
  render () {
    return (
      <nav className={styles.nav}>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <div>
          <PillButton hollow="true" to="/login" className={styles.button}>Log In</PillButton>
          <PillButton to="/" className={styles.button}>Sign Up</PillButton>
        </div>
      </nav>
    )
  }
}
