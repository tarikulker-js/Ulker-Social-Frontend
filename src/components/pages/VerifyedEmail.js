import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';
import { useParams } from 'react-router-dom';

export default function VerifyedEmail(){
	const { email } = useParams();
	
	
	useEffect(() => {
		M.toast({html: "Onaylaniyor... Lütfen Bekleyiniz!", classes: "yellow"})
		
		fetch(`${API_URL}/verify-account`, {
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
					window.location='/signin';
				}, 2000)
				
			}
		})
		.catch(err => M.toast({html: "Sunucuya Bağlanılamadı. Lütfen internet bağlantınızı kontorl ediniz. ", classes: "red"}))
		

        console.log(email);

	})
	
	return(
		<div>
			<center>
				<div className="card">
					<div className="card-content auth-card input-field">
						<center>
							
							<h2 style={{fontSize: '30px'}}>Hesabiniz Onaylandi!</h2>
							
						</center>
					</div>
				</div>
			</center>

		</div>
	)
}

