import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory, Link } from 'react-router-dom';

import axios from 'axios';

import Navbar from './components/Navbar';
import LoginedHamburgerMenu from './components/LoginedHamburgerMenu';
import UnLoginedHamburgerMenu from './components/UnLoginedHamburgerMenu';
import { API_URL } from './config';

import Copyright from './components/Copyright';

//Page Import
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile.js';
import UserProfile from './components/pages/UserProfile';
import SearchUser from './components/pages/SearchUser';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Signout from './components/pages/Signout';
import Reset from './components/pages/Reset';
import NewPassword from './components/pages/NewPassword';
import CreatePost from './components/pages/CreatePost';
import Discover from './components/pages/Discover';
import VerifyEmail from './components/pages/VerifyEmail';
import VerifyedEmail from './components/pages/VerifyedEmail';
import Chat from './components/pages/Chat';
import DownloadApp from './components/pages/DownloadApp';

import { reducer, initialState } from './reducers/userReducer';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import CookiePolicy from './CookiePolicy';


export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	const [clientOS, setClientOS] = useState(null);

	function getOperatingSystem() {
		let operatingSystem = 'Not known';
		if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'Windows OS'; }
		if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'MacOS'; }
		if (window.navigator.appVersion.indexOf('X11') !== -1) { operatingSystem = 'UNIX OS'; }
		if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'Linux OS'; }

		return setClientOS(operatingSystem);


	}

	useEffect(() => {
		getOperatingSystem()

		fetch(`${API_URL}/protected`, {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then((res) => res.json())
			.then((data) => {
				//console.log("TOKEN Verify", data);

				if (data.error === null && data.auth === true) {
					//window.location="/";
					dispatch({ type: "USER", payload: data.user })

				} else if (data.error && data.auth === false) {
					//window.location="/signin";

					localStorage.setItem("jwt", null);
					localStorage.setItem("user", null);
					localStorage.setItem("userId", null);

				}
			})
			.catch((err) => {
				//console.log("VERIFY TOKEN ERROR!!" + err)
			})

	}, [])

	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path='/signin'>
				<Signin />
			</Route>
			<Route path='/signup'>
				<Signup />
			</Route>
			<Route path='/signout'>
				<Signout />
			</Route>
			<Route exact path='/profile'>
				<Profile />
			</Route>
			<Route path='/profile/edit'>
				<EditProfile />
			</Route>
			<Route path='/createpost'>
				<CreatePost />
			</Route>
			<Route path="/user/:userid">
				<UserProfile />
			</Route>
			<Route path="/discover">
				<Discover />
			</Route>
			<Route exact path="/reset">
				<Reset />
			</Route>
			<Route path="/reset/:token">
				<NewPassword />
			</Route>
			<Route path="/search">
				<SearchUser />
			</Route>
			<Route exact path="/verify">
				<VerifyEmail />
			</Route>
			<Route path="/verify/:email">
				<VerifyedEmail />
			</Route>

			<Route path="/chat">
				<Chat />
			</Route>
			
			<Route path="/privacy-policy">
				<PrivacyPolicy />
			</Route>
			<Route path="/terms-of-use">
				<TermsOfUse />
			</Route>
			<Route path="/cookie-policy">
				<CookiePolicy />
			</Route>

			{
				!clientOS ? <></> : clientOS=="Linux OS" ? <Route path='/download'>
					<DownloadApp />

				</Route> : <></>
			}



		</Switch>
	)

}

export default function App() {
	const [logined, setLogined] = useState(false)
	const [state, dispatch] = useReducer(reducer, initialState)
	const user = localStorage.getItem("user");

	useEffect(() => {
		fetch(`${API_URL}/protected`, {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then((res) => res.json())
			.then((data) => {
				//console.log("TOKEN Verify", data);
				//console.log(data.auth);
				if (data.auth) {
					setLogined(true);
				}

			})
			.catch((err) => {
				//console.log("VERIFY TOKEN ERROR!!" + err)
			})
	}, [])

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				{
					window.innerWidth < 1000 ?

						<div className='AppBarPhone'>
							<div className='menu'>
								{logined === true
									? <LoginedHamburgerMenu style={{ position: "fixed" }} />
									: <UnLoginedHamburgerMenu style={{ position: "fixed" }} />}
								<center>
									<h4 style={{
										padding: "5px"
									}} class="brand-logo navbar-logo appbarlogo"><Link to="/" class="brand-logo navbar-logo" >Ulker Social</Link></h4>
								</center>

							</div>
						</div>
						:
						<Navbar className="navbar-menu" style={{ width: "100%", position: "fixed" }} />
				}

				<div className="app">
					<Routing />
					<Copyright />
				</div>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

