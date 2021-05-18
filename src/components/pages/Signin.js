import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';

export default function Signin(){
	
	const { state,dispatch } = useContext(UserContext)
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	
	function signinFunc(){
		M.toast({html: "Giriş Yapılıyor... Lütfen Bekleyiniz!", classes: "yellow"})
		
		fetch(`${API_URL}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password,
				email
			})
		})
		.then(res => res.json())
		.then(data => {
			//axios.post("${API_URL}/", data)
			
			console.log(data)
			
			if(data.error){
				M.toast({html: data.error, classes: "red"})
			}else{
				console.log("DATA", data)
				localStorage.setItem("jwt", data.token);
				localStorage.setItem("user", JSON.stringify(data));
				localStorage.setItem("userId", data.user)
				localStorage.setItem("following", data.following);
				localStorage.setItem("followers", data.followers);
				
				console.log("DATA", data.user)
				console.log("LOCALSTORAGE ID", localStorage.getItem("userId"))
				
				
				dispatch({type: "USER", payload: data.user})
				
				M.toast({html: "Giriş başarılı.", classes: "green"})
				
				setTimeout(function(){
					window.location='/';
				}, 3500)
				
			}
		})
		.catch(err => M.toast({html: "Sunucuya Bağlanılamadı. Lütfen internet bağlantınızı kontorl ediniz. ", classes: "red"}))
		
	}
	
	return(
		<div>
			<center>
				<div className="card">
					<div className="card-content auth-card input-field">
						<center>
							
							<h2 style={{fontSize: '30px'}}>Ulker Social</h2>
							<input 
								type='text'
								placeholder='E-Mail'
								value={ email }
								onChange={(e) => setEmail(e.target.value)}
							/>

							<input 
								type='password'
								placeholder='Password'
								value={ password }
								onChange={(e) => setPassword(e.target.value)}
								
							/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => signinFunc(e) }
							>
									Login
							</button>

							<h5>Halen bir hesabınız yok mu? <Link to='/signup'>Kayıt olun!</Link></h5>
							<br/>
							
							<h6><Link to='/reset'>Şifremi Unuttum</Link></h6>

						</center>
					</div>
				</div>
			</center>

		</div>
	)
}
