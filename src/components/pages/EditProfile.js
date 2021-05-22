import React,{useEffect,useState, useContext} from 'react';
import { FaUserAstronaut } from "react-icons/fa";
import axios from 'axios';
import M from 'materialize-css';
import {UserContext} from '../../App';
import { API_URL, UPLOAD_IMG_URL } from '../../config';
import Share from './userShare';

export default function EditProfile(){
	const user = JSON.parse(localStorage.getItem("user"));
	const myId = localStorage.getItem("userId");
	
	const [userProfile, setUser] = useState({
		email: null,
		followers: [],
		following: [],
		name: null,
		password: null,
		pic: null,
		_id: null
	})
	const [image,setImage] = useState("");
	const [name,setName] = useState("");
	const [email, setEmail] = useState("");
	const [url, setUrl] = useState("");
	
	useEffect(() => {
		
		fetch(`${API_URL}/profile`, {
			type: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			setUser(result.user)
		})
		.catch(err => {
			console.log(err)
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
					console.log(res);
					
					M.toast({html: "Profil Resminiz Güncellendi", classes: "green"});
					
					setTimeout(function(){
						window.location='/profile'
					}, 2000)
					
				}).catch(err => {
					console.log(err);
					
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
	
	const updateName = (newNameFunc) =>{
		
		const postData = {
			name,
			userId: userProfile._id
		}
		
		axios.post(`${API_URL}/updatename`, {
			postData
		}).then(res => {
			console.log(res);
			
			M.toast({html: res.data.message, classes: "green"});
			
			setTimeout(function(){
				window.location='/profile'
			}, 2000)
			
		}).catch(err => {
			console.log(err);
			
			M.toast({html: err, classes: "red"});
			
		})
		.catch(err=>{
			M.toast({html: err, classes: "red darken-3"})
		})
	}
	
	const updateEmail = (newEmailFunc) =>{
		
		const postData = {
			email,
			userId: userProfile._id
		}
		
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Geçersiz Email",classes:"#c62828 red darken-3"})
            return
        }
		
		axios.post(`${API_URL}/updateemail`, {
			postData
		}).then(res => {
			console.log(res);
			
			M.toast({html: res.data.message, classes: "green"});
			
			setTimeout(function(){
				window.location='/profile'
			}, 2000)
			
		}).catch(err => {
			console.log(err);
			
			M.toast({html: err, classes: "red"});
			
		})
		.catch(err=>{
			M.toast({html: err, classes: "red darken-3"})
		})
	}
	
	const updatePassword = () => {
		M.toast({html: "Email Gönderiliyor... Lütfen Bekleyiniz!", classes: "yellow"})
		
		fetch(`${API_URL}/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: userProfile.email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			
			if(data.error){
				M.toast({html: data.error, classes: "red"})
			}else{
				M.toast({html: data.message, classes: "green"})
				
				setTimeout(function(){
					window.location='/profile';
				}, 2000)
				
			}
		})
		.catch(err => {
			M.toast({html: "Sunucuya Bağlanılamadı. Lütfen internet bağlantınızı kontorl ediniz. ", classes: "red"});
			console.log(err)
		})
		
	}
	
	return(
		<div style={{ maxWidth: '850px', margin: '0px auto'}}>
			<center>
				<div className="card" style={{width: "100%"}}>
					<div className="card-content auth-card input-field" style={{width: "100%"}}>
						
						<div classNames="changeImg">
							<h6 style={{fontSize: "25px"}}>Profilinizi Güncelleyin</h6>

							<div className='file-field input-field'>
								<div className='btn'>

									Profil Resminizi Güncelleyin
									<input 
										type='file'
										onChange={(e) => updatePhoto(e.target.files[0])}
									/>
								</div>
								<div className='file-path-wrapper'>
									<input 
										className='file-path validate'
										placeholder='Görseliniz (Zorunlu değildir fakat bir görsel koymadığınız taktirde gönderinize default resim atanır.)'
										type='text'
									/>

								</div>


							</div>
						</div>

						<div className="changeName">
								Adınızı Güncelleyin: 

							<br />

								<input 
									type='text'
									placeholder='Adınız'
									value={ name }
									onChange={(e) => setName(e.target.value)}
								/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => updateName(e) }
							>
									İsminizi Güncelleyin
							</button>
						</div>
						
						<br/>
						
						<hr/>
						
						<br/>
						
						<div className="changeEmail">
								Email'inizi Güncelleyin: 

							<br />

								<input 
									type='email'
									placeholder='E-Mail'
									value={ email }
									onChange={(e) => setEmail(e.target.value)}
								/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => updateEmail(e) }
							>
									Emailinizi Güncelleyin
							</button>
						</div>
						
						<br/>
						
						<hr/>
						
						<br/>
						
						<div className="changePassword">
							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => updatePassword(e) }
							>
									Şifrenizi Güncelleyin
							</button>
						</div>
						
					</div>
				</div>
			</center>
		</div>
	)
}
