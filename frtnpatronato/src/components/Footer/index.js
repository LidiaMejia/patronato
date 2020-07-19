import React from 'react'
import {NavLink} from 'react-router-dom';
import {MdHome} from 'react-icons/md'; //Iconos de react icons. Se coloca Nombre y Librería
import {FaSignInAlt, FaVoteYea} from 'react-icons/fa';
import './footer.css';

export default ()=>{
    return(
        <section>
            <footer>
                <nav>
                    <ul>
                        <li> <NavLink to="/"><MdHome size="2em"/></NavLink> </li>
                        <li> <NavLink to="/signin"><FaSignInAlt size="2em"/></NavLink> </li>
                        <li> <NavLink to="/votes"><FaVoteYea size="2em"/></NavLink> </li>
                    </ul>
                </nav>
            </footer>
        </section>
    );
}