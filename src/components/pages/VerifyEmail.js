import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';

export default function Reset(){
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	
	
	function verifyEmail(){
		window.location="/verify/"+email
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
								onClick={ (e) => verifyEmail(e) }
							>
                                Hesabımı onayla!
							</button>

						</center>
					</div>
				</div>
			</center>

		</div>
	)
}

