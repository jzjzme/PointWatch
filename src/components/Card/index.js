
import React from "react"
import styles from "./styles.scss"

export const Card = ({ className, children }) => (
  <div className={`${styles.card} ${className}`}>{children}</div>
)

export const CardGroup = ({ className, children }) => (
  <div className={`${styles.cardGroup} ${className}`}>{children}</div>
)
