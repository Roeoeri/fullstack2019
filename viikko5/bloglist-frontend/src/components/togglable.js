import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick = {toggleVisibility}> {props.buttonLabelYla}</button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick = {toggleVisibility}>{props.buttonLabelAla}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabelYla: PropTypes.string.isRequired,
  buttonLabelAla: PropTypes.string.isRequired
}

export default Togglable