import * as React from 'react'
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiFolder, FiLogIn, FiLogOut } from "react-icons/fi";
import { BiRegistered } from 'react-icons/bi'


const Navigation = ({ authedUser, logout }) => {
    if (authedUser === null) {
        return (
            <nav className="Navigation">
                <ul>
                    <li>
                        <Link to='/'><FiLogIn /> Login</Link>
                    </li>
                    <li>
                        <Link to='/register'><BiRegistered /> Register</Link>
                    </li>
                </ul>
            </nav>
        )
    }


    return (
        <nav className="Navigation">
            <ul>
                <li>
                    <Link to='/'>
                        <FiHome />
                    </Link>
                </li>
                <li>
                    <Link to='/note/new'>
                        <FiPlusCircle />
                    </Link>
                </li>
                <li>
                    <Link to='/archives'>
                        <FiFolder />
                    </Link>
                </li>
                <li><button className='logout' onClick={logout}><FiLogOut /></button></li>
            </ul>
        </nav>
    )
}

export default Navigation
