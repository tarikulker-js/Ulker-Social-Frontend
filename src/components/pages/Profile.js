import React,{useEffect,useState, useContext} from 'react';
import { FaUserAstronaut } from "react-icons/fa";
import axios from 'axios';
import M from 'materialize-css';
import {UserContext} from '../../App';
import { API_URL, UPLOAD_IMG_URL } from '../../config';

export default function Profile(){
	const myId = localStorage.getItem("userId");
	
	const [user, setUser] = useState("");
	const [userProfile, setUserProfile] = useState({
		email: null,
		followers: [],
		following: [],
		name: null,
		password: null,
		pic: null,
		_id: null
	})
	const [profilePic, setProfilePic] = useState("");
	const [image,setImage] = useState("")
	const [url, setUrl] = useState("")
	const {state,dispatch} = useContext(UserContext)
	const [mypics, setPics] = useState([]);
	
	useEffect(() => {
		fetch(`${API_URL}/mypost`, {
			type: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			setPics(result.myPosts);
		})
		.catch(err => {
			//console.log(err)
		})


		
		fetch(`${API_URL}/profile`, {
			type: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			//console.log(result)
			setUser(result.user);
			setUserProfile(result.user)
			setProfilePic(result.user.pic);
		})
		.catch(err => {
			//console.log(err)
		})
		
	}, [])
	
	useEffect(() => {
		if(image){
			const data = new FormData()
			data.append("file", image)
			data.append("upload_preset","tut_social")
			data.append("cloud_name","doaf7ybhd")

			
			fetch(`${UPLOAD_IMG_URL}`,{
				 method:"POST",
				 body: data
			})
			.then(res=>res.json())
			.then(data => {
				setUrl(data.url)
				
				const postData = {
					pic: data.url,
					userId: userProfile._id
				}
			
				axios.post(`${API_URL}/updatepp`, {
					postData
				}).then(res => {
					//console.log(res);
					
					M.toast({html: "Profil Resminiz Güncellendi", classes: "green"});
					
					setTimeout(function(){
						window.location='/profile'
					}, 2000)
					
				}).catch(err => {
					//console.log(err);
					
					M.toast({html: "Bir hata oluştu.", classes: "red"});
					
				})
				
			})
			.catch(err=>{
				M.toast({html: err, classes: "red darken-3"})
			})
			
		}
	}, [image])
	
	const updatePhoto = (file) => {
		setImage(file);
	}
	
	return(
		<div style={{ maxWidth: '850px', margin: '0px auto'}}>
			<div style={{
					display: 'flex',
					justifyContent: 'space-arround',
					margin: '18px 0px',
					borderBottom: '1px solid gray'
				}}>
				<div>
					
					{
						<img 
							className="profileImg" 
							style={{width:"160px",height:"160px",borderRadius:"80px"}} 
							src={profilePic}
						/>
					}
				</div>
				<div>
					
					<h5 style={{fontSize: "3vh", margin: "0.4vh"}}>{user.name ? user.name : 
						 <div className='loading'>

										<center>
											<img 
												src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

												height="100px"
												width="150px"
											/>

											<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>


										</center>

									</div>
						 }</h5>

					<h6 style={{fontSize: "2vh", margin: "2vh"}}>{user.email ? user.email : 
						 <div className='loading'>

										<center>
											<img 
												src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

												height="100px"
												width="150px"
											/>

											<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>


										</center>

									</div>
						 }</h6>
					
					<br/>
					
					<p style={{margin: "2vh"}}>{user.bio ? user.bio : 
						 <div className='loading'>

										<center>
											<img 
												src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

												height="100px"
												width="150px"
											/>

											<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>


										</center>

									</div>
						 }</p>
					
					<h5 style={{margin: "2vh", fontSize: "2vh"}}><a href={user.site}>{user.site}</a></h5>
					
					<br/>
					
					<div style={{
							display: 'flex', 
							justifyContent: 'space-between', 
							width: '100%'}}>
						<h5 style={{margin: "10px"}}>{
								mypics.length !== null
									
									?
									
									mypics.length
									
									:
									
									<div className='loading'>

										<center>
											<img 
												src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

												height="100px"
												width="150px"
											/>

											<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>


										</center>

									</div>
								
								
							} Post </h5>
						<h5 style={{margin: "10px"}}> {userProfile.followers.length} Takipçi</h5>
						<h5 style={{margin: "10px"}}> {userProfile.following.length} Takip</h5>
						
						
						
					</div>
					
					<br/>
						
						<div className='upload_photo' style={{float: "left"}}>
							<a href="/profile/edit"><button 
								className="btn input waves-effect waves-dark"
							>Profilinizi Güncelleyin</button></a>
							
						</div>
						
				</div>
			</div>
			
			<div className='gallery'>
				
				{
					
					mypics.length !== null
					
						?
						
					mypics.map(item=> {
						return(
							<div className='card home-card'>
								<img 
									key={item._id}
									src={item.picture}
									alt={item.title}
									height="250"
									width="250"
								/>
							</div>
						)
					})
					
					:
					
						<div className='loading'>
							
							<center>
								<img 
								src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

									height="225px"
									width="300px"
								/>

								<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>


								
							</center>
							
						</div>
					
				}
				
			</div>
			
	</div>
	)
}
