
import React, {Component} from "react"
import { Link } from "react-router-dom"
import styles from "./styles.scss"

export class PillButton extends Component {
  render () {
    const { className, children, to, hollow, onClick, capitalOne, disabled } = this.props
    const buttonClassName = `${styles.button} ${hollow && styles.mHollow} ${capitalOne && styles.mCapitalOne}`

    if (to) {
      return (
        <Link disabled={disabled} to={to} className={`${className} ${styles.linkWrapper}`}>
          <button className={buttonClassName}>{children}</button>
        </Link>
      )

    } else if (onClick) {
      return (<button disabled={disabled} onClick={onClick} className={`${className} ${buttonClassName}`}>{children}</button>)
    
    } else {
      console.error("PillButton requires either to or onClick")
      return null
    }
  }
}
