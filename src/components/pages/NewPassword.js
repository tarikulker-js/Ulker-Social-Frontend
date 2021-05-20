import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';

export default function Reset(){
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const {token} = useParams();
	
	function signinFunc(){
		M.toast({html: "Giriş Yapılıyor... Lütfen Bekleyiniz!", classes: "yellow"})
		
		fetch(`${API_URL}/new-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password,
				token
			})
		})
		.then(res => res.json())
		.then(data => {
			//axios.post("${API_URL}/", data)
			
			console.log(data)
			
			if(data.error){
				M.toast({html: data.error, classes: "red"})
			}else{
				M.toast({html: data.message, classes: "green"})
				
				setTimeout(function(){
					window.location='/signout';
				}, 2000)
				
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
								type='password'
								placeholder='Yeni Şifreniz'
								value={ password }
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => signinFunc(e) }
							>
									Şifreyi Yenile
							</button>

						</center>
					</div>
				</div>
			</center>

		</div>
	)
}


