import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';

export default function Reset(){
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	
	
	function resetPassword(){
		M.toast({html: "Giriş Yapılıyor... Lütfen Bekleyiniz!", classes: "yellow"})
		
		fetch(`${API_URL}/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email
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
					//window.location='/signin';
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
								type='text'
								placeholder='E-Mail'
								value={ email }
								onChange={(e) => setEmail(e.target.value)}
							/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => resetPassword(e) }
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

