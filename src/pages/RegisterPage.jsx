import React from 'react'
import RegisterInput from '../components/RegisterInput'
import { useNavigate } from 'react-router-dom'
import { register } from '../utils/network-data'

const RegisterPage = () => {
  const navigate = useNavigate()

  async function onRegisterHandler(user) {
    // console.log(user)
    const { error } = await register(user);
    if (!error) {
      navigate('/')
    }
  }

  return (
    <section>
      <h3>RegisterPage</h3>
      <RegisterInput register={onRegisterHandler} />

    </section>
  )
}

export default RegisterPage