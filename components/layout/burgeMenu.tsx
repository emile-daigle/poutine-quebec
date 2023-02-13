import React, { Children, useState } from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"


function BurgerMenu() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div className="burgMenu">
                <a href="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </a>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <a href="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default BurgerMenu;