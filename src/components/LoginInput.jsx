import React from 'react'
import useInput from '../hooks/useInput'

const LoginInput = ({ login }) => {
    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')

    function onSubmitEventHandler(event) {
        event.preventDefault();
        login({ email, password })
    }

    return (
        <form onSubmit={onSubmitEventHandler}>
            <input type="email" placeholder='Email' value={email} onChange={onEmailChange} autoComplete='off' className='title' />
            <input type='password' placeholder='Password' value={password} onChange={onPasswordChange} rows={13} className='title' />
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginInput