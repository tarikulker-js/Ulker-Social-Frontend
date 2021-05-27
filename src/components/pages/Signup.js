import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { API_URL, UPLOAD_IMG_URL } from '../../config';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

export default function SignIn() {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    
	useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
	
    const uploadPic = ()=>{
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
			setUrl(data.url);
		})
		.catch(err=>{
			M.toast({html: err, classes: "red darken-3"})
		})
		
    }
	 
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Geçersiz Email",classes:"#c62828 red darken-3"})
            return
        }
		
		alert("signup beforeing", url);
		
        fetch(`${API_URL}/signup`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic: url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }
	
	const responseGoogle = (response) => {
		setUrl(response.profileObj.imageUrl);
		setName(response.profileObj.name);
		setEmail(response.profileObj.email);
	}
	
   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2 style={{fontSize: '30px'}}>Ulker Social</h2>
			
			  	<div className="card login-with">
					<div className="card-content">
						<GoogleLogin
							clientId="492526209321-qbenq1m1sep0298rsq6kb1ek87b8nhbl.apps.googleusercontent.com"
							buttonText="Google ile Kayıt Olun."
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={'single_host_origin'}
						/>

					</div>
				</div>
			  
			<input
				type="text"
				placeholder="Adınız"
				value={name}
				onChange={(e)=>setName(e.target.value)}
       	    />
       		<input
				type="text"
				placeholder="Email"
				value={email}
				onChange={(e)=>setEmail(e.target.value)}
       	    />
 	           <input
				type="password"
				placeholder="Şifreniz"
				value={password}
				onChange={(e)=>setPasword(e.target.value)}
            />
       	    <div className="file-field input-field">
       			 <div className="btn waves-effect waves-dark">
					 
					 Profil Resminiz:
                <input 
					type="file" 
					onChange={(e)=>setImage(e.target.files[0])}
					placeholder="Profil Resmi"
				 />
        </div>
			<div className="file-path-wrapper">
				<input className="file-path validate" type="text" />
			</div>
        </div>
            <button className="btn waves-effect waves-dark"
            onClick={()=>PostData()}
            >
                Kayıt Ol
            </button>
            
		 	  <h5>Zaten bir hesabınız var mı? <Link to='/signin'>Giriş Yapın!</Link></h5>
             
               
         
            
    
        </div>
      </div>
   )
}