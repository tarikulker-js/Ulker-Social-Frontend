import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { LoginedSidebarData } from './LoginedSidebarData';
import { unloginedSidebarData } from './unloginedSidebarData';

import './HamburgerMenu.css';
import { IconContext } from 'react-icons';

function HamburgerMenu() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='HamburgerMenu'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars className="menu-bars" style={{color: "black", float: "left"}} onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='HamburgerMenu-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {
					 unloginedSidebarData.map((item, index) => {
              	 	return (
                  	<li key={index} className={item.cName}>
								<a href={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</a>
                		</li>
            	  );
            	})
					 
				}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default HamburgerMenu;