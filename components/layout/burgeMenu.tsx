import React, { Children, MouseEvent } from 'react';
import * as FaIcons from "react-icons/fa"


function BurgerMenu() {
    return (
        <>
            <div className="burgMenu">
                <a href="#" className="menu-bars">
                    <FaIcons.FaBars/>
                </a>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul>

                </ul>
            </nav>
        </>
    )
}

export default BurgerMenu;