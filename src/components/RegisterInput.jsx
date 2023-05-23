import React from 'react'
import useInput from '../hooks/useInput'


const RegisterInput = ({ register }) => {
    const [name, onNameChange] = useInput('')
    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')


    function onSubmitEventHandler(event) {
        event.preventDefault();
        // console.log({ name, email, password })
        register({ name, email, password })
    }
    return (
        <form onSubmit={onSubmitEventHandler}>
            <input type="text" placeholder='Nama' value={name} onChange={onNameChange} autoComplete='off' className='title' />
            <input type="email" placeholder='Email' value={email} onChange={onEmailChange} autoComplete='off' className='title' />
            <input type='password' placeholder='Password' value={password} onChange={onPasswordChange} rows={13} className='title' />
            <button type='submit'>Register</button>
        </form>
    )
}

export default RegisterInput