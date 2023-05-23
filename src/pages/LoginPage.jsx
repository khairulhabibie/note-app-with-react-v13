import React from 'react'
import LoginInput from '../components/LoginInput'
import { login } from '../utils/network-data'
import { useNavigate } from 'react-router'

const LoginPage = ({ loginSuccess }) => {
  const navigate = useNavigate()
  async function onLoginHandler(user) {
    const { error, data } = await login(user)

    if (!error) {
      loginSuccess(data)
      navigate('/')
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