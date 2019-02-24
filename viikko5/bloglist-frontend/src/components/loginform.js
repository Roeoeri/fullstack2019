import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  buttonLabel
}) => {
  return (
    <div>
      <h2>Syötä käyttäjätunnus ja salasana</h2>

      <form onSubmit = {handleSubmit}>
        <div>
                Käyttäjätunnus
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                Salasana
          <input
            type="password"
            value = {password}
            onChange = {handlePasswordChange}
          />
        </div>
        <button type = "submit">{buttonLabel}</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default LoginForm