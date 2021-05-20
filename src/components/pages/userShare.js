import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ShareData } from './ShareData';
import QRCode from 'qrcode.react';

import './HamburgerMenu.css';
import { IconContext } from 'react-icons';

function HamburgerMenu() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const myId = localStorage.getItem("userId");


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='HamburgerMenu'>
          <Link to='#' className='menu-bars'>
            <FiIcons.FiShare className="menu-bars" style={{color: "black", float: "left"}} onClick={showSidebar} />
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
					 ShareData.map((item, index) => {
              	 	return (
                  	<li key={index} className={item.cName}>
								<Link to={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</Link>
                		</li>
            	  );
            	})
					 
				}
			  
			  <QRCode value={`https://u-social-beta.run-eu-central1.goorm.io/user/${myId}`} style={{zIndex: 9999999999}}/>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default HamburgerMenu;