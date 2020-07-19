import React from 'react'
import {NavLink} from 'react-router-dom';

export default ()=>{
    return(
        <section>
            <footer>
                <nav>
                    <li> <NavLink to="/">Home</NavLink> </li>
                    <li> <NavLink to="/signin">SignIn</NavLink> </li>
                    <li> <NavLink to="/votes">Votes</NavLink> </li>
                </nav>
            </footer>
        </section>
    );
}