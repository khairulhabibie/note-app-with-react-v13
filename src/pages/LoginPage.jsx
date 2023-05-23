import React from 'react'
import LoginInput from '../components/LoginInput'
import { login } from '../utils/network-data'

const LoginPage = ({ loginSuccess }) => {
  async function onLoginHandler(user) {
    const { error, data } = await login(user)

    if (!error) {
      loginSuccess(data)
    }
  }

  return (
    <section>
      <h3>LoginPage</h3>
      <LoginInput login={onLoginHandler} />
    </section>
  )
}

export default LoginPage