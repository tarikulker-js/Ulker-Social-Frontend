import React, { useEffect } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

export default function NavBar(){
	
	useEffect(() => {
		localStorage.setItem("jwt", null)
		localStorage.setItem("user", null)
		
		M.toast({html: 'Çıkış Yapıldı. Yönlendiriliyorsunuz...', classes: 'green darken-3'})

		setTimeout(function(){
			window.location='/'
		}, 2000)
		
	})
	
	return(
		<div>
			<h3>Lütfen bekleyiniz. Çıkış yapılıyor...</h3>

		</div>
	)
}

