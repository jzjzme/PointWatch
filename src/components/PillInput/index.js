
import React from "react"
import styles from "./styles.scss"

export const PillInput = ({ className, type, placeholder, value, onChange }) => (
  <input
    type={type || "text"}
    placeholder={placeholder}
    className={`${className} ${styles.input}`}
    value={value}
    onChange={onChange} />
)
