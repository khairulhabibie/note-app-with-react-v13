import * as React from 'react'
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiFolder, FiLogIn, FiLogOut } from "react-icons/fi";
import { GiArchiveRegister } from 'react-icons/gi'
import { MdLightMode, MdModeNight } from 'react-icons/md'

import ThemeContext from '../contexts/ThemeContext'


const Navigation = ({ authedUser, logout }) => {
    const { theme, toggleTheme } = React.useContext(ThemeContext)

    if (authedUser === null) {
        return (
            <nav className="Navigation">
                <ul>

                    <li>
                        <Link to='/'><FiLogIn /></Link>
                    </li>
                    <li>
                        <Link to='/register'><GiArchiveRegister /> </Link>
                    </li>
                    <li>
                        <button className='toggle' onClick={toggleTheme}>{theme === 'light' ? <MdModeNight /> : <MdLightMode />}
                        </button>
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
                <li>
                    <button className='toggle' onClick={toggleTheme}>{theme === 'light' ? <MdModeNight /> : <MdLightMode />}
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
