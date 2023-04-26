import {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  })
  const {history} = props

  if (Cookies.get('jwt_token') !== undefined) {
    history.replace('/')
  }

  const onHandleSubmit = async event => {
    event.preventDefault()
    const user = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      setError({
        isError: true,
        errorMessage: data.error_msg,
      })
    }
  }

  return (
    <div className="loginAppContainer">
      <div className="loginChildContainer">
        <img
          className="lgImage"
          src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682340235/Insta%20login%20Page/Layer_2_ulx3b3.png"
          alt="website login"
        />
        <form className="formContainer" onSubmit={onHandleSubmit}>
          <img
            className="logo"
            src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682340305/Insta%20login%20Page/Standard_Collection_8_xwvvyx.png"
            alt="website logo"
          />
          <h1 className="webSiteName">Insta Share</h1>
          <div className="customInputContainer">
            <label className="customLabel" htmlFor="username">
              USERNAME
            </label>
            <input
              className="customInput"
              id="username"
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div className="customInputContainer">
            <label className="customLabel" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="customInput"
              id="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          {error.isError && (
            <p className="errorWarningText">{error.errorMessage}</p>
          )}
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
