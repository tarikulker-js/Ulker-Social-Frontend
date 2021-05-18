import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Route(){
	const user = JSON.parse(localStorage.getItem("user"))
	
	if(user){
		return(
			<div className=''>
				<ul id="nav-mobile" class="right hide-on-med-and-down navbar-ul">
					<h4 style={{
							padding: "5px"
						}} class="brand-logo navbar-logo"><Link to="/" class="brand-logo navbar-logo" >Ulker Social</Link></h4>
					<li class='navbar-li'><Link to="/discover" class='navbar-li'><h6 class='navbar-h6'>Keşfet</h6></Link></li>
					<li class='navbar-li'><Link to="/profile" class='navbar-li'><h6 class='navbar-h6'>Profile</h6></Link></li>
					<li class='navbar-li'><Link to="/createpost" class='navbar-li'><h6 class='navbar-h6'>Create Post</h6></Link></li>
					<li class='navbar-li red'><Link to="/signout" class='navbar-li'><h6 class='navbar-h6 signout-h6'>Signout</h6></Link></li>

				 </ul>
			</div>
		)
	}else{
		return(
			<div>
				<ul id="nav-mobile" class="right hide-on-med-and-down navbar-ul">
					<h4 class="brand-logo navbar-logo"><Link to="/signin" class="brand-logo navbar-logo" >TUT Social</Link></h4>
					<li class='navbar-li'><Link to="/signin" class='navbar-li'><h6 class='navbar-h6'>Signin</h6></Link></li>
					<li class='navbar-li'><Link to="/signup" class='navbar-li'><h6 class='navbar-h6'>Signup</h6></Link></li>
				 </ul>
			</div>
		)
	}
	
}

export default function NavBar(){
	return(
		<div>
			<nav>
				<div class="nav-wrapper white">
					<Route />
				</div>
			</nav>

		</div>
	)
}
