
import React, {Component} from "react"
import { Link } from "react-router-dom"
import styles from "./styles.scss"

export class PillButton extends Component {
  render () {
    const { className, children, to, hollow, onClick, capitalOne } = this.props
    const buttonClassName = `${styles.button} ${hollow && styles.mHollow} ${capitalOne && styles.mCapitalOne}`

    if (to) {
      return (
        <Link to={to} className={className}>
          <button className={buttonClassName}>{children}</button>
        </Link>
      )

    } else if (onClick) {
      return (<button onClick={onClick} className={`${className} ${buttonClassName}`}>{children}</button>)
    
    } else {
      console.error("PillButton requires either to or onClick")
      return null
    }
  }
}
