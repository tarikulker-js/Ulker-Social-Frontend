import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';

export default function Reset(){
	const [username, setUsername] = useState("");
	
	function signinFunc(){
		const postData = {
			name: username
		}
		
		axios.post(`${API_URL}/search`, postData)
		.then(res => {
			console.log(res);
			
			if(res.data.error){
				M.toast({html: res.data.error, classes: "red darken-3"})
			}else if(!res.data.error){
				setTimeout(function(){
					window.location=`/user/${res.data._id}`;
					console.log(`/user/${res.data._id}`);
				}, 2500)
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	
	return(
		<div>
			<center>
				<div className="card">
					<div className="card-content auth-card input-field">
						<center>
							
							<h2 style={{fontSize: '30px'}}>Ulker Social</h2>
							
							<input 
								type='search'
								placeholder='Yeni Şifreniz'
								value={ username }
								onChange={(e) => setUsername(e.target.value)}
							/>

							<button 
								className="btn waves-effect waves-dark"
								type="submit"
								name="action"
								onClick={ (e) => signinFunc(e) }
							>
									Ara
							</button>
							
							<br/>
							
							<p style={{fontSize: '12.5px'}}>Burada sadece Kullanıcı Adı sorgulanır. </p>
							
						</center>
					</div>
				</div>
			</center>

		</div>
	)
}



