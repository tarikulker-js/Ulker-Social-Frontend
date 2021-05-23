import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';

export default function CreatePost(){ 
	
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState("");
	
	const postDetails = () => {
		if(image){
				if(image.type.substring(0, 5) !== String("image")){
				M.toast({html: "Lütfen sadece Resim yükleyiniz.", classes: "yellow"})
			}else if(image.type === "image/gif"){
				M.toast({html: "Gif yüklemek için premium olmalısınız.", classes: "yellow"})
			}else	if(image.type.substring(0, 5) == "image"){
				if(image.size > 5242880){
					M.toast({html: "Dosya boyutu 5MB'dan fazla. Lütfen başka bir resim seçiniz. Ya da premium satın alınız.", classes: "yellow darken-3"});
				}else if(image.size < 5242880){
					const data = new FormData()
					data.append("file", image)
					data.append("upload_preset","tut_social")
					data.append("cloud_name","doaf7ybhd")

					fetch("https://api.cloudinary.com/v1_1/doaf7ybhd/image/upload",{
						 method:"POST",
						 body: data
					})
					.then(res=>res.json())
					.then(data => {

						setUrl(data.url);

							fetch(`${API_URL}/createpost`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer "+localStorage.getItem("jwt")
							},
							body: JSON.stringify({
								title: title,
								body: body,
								pic: data.url
							})
						}).then(res => res.json())
						.then(data => {

							console.log(data);

							if(data.error){
								M.toast({html: data.error, classes: "red darken-3"})
							}else{
								M.toast({html: 'Postunuz başarıyla oluşturuldu. ', classes: "green"})

								window.location='/profile';
							}
						})
						.catch(err => {
							M.toast({html: err, classes: "red darken-3"})
						})


					})
					.catch(err=>{
						M.toast({html: err, classes: "red darken-3"})
					})
				}

			}
		}else{
			fetch(`${API_URL}/createpost`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer "+localStorage.getItem("jwt")
				},
				body: JSON.stringify({
					title: title,
					body: body,
				})
			}).then(res => res.json())
			.then(data => {
				console.log(data);

				if(data.error){
					M.toast({html: data.error, classes: "red darken-3"})
				}else{
					M.toast({html: 'Postunuz başarıyla oluşturuldu. ', classes: "green"})

					window.location='/profile';
				}
			})
			.catch(err => {
				M.toast({html: err, classes: "red darken-3"})
			})


		}
		
	}
	
	return(
		<div className='card input-field' style={{
				maxWidth: '100%',
				margin: '30px auto',
				padding: '20px',
				textAlign: 'center'
			}}>
			
				<input 
					type='text'
					placeholder='Başlık (Zorunludur)'
					value={ title }
					onChange={(e) => setTitle(e.target.value)}
				/>

				<input 
					type='text'
					placeholder='Açıklama'
					value={ body }
					onChange={(e) => setBody(e.target.value)}
				/>

				<div className='file-field input-field'>
					<div className='btn'>
						<button className="btn waves-effect waves-dark" type="submit" name="action">
						Resim Yükle
					</button>
						<input 
							type='file'
							placeholder='Görseliniz (Zorunlu değildir fakat bir görsel koymadığınız taktirde gönderinize default resim atanır.)'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
					
					<div className='file-path-wrapper'>
						<input 
							className='file-path validate'
							placeholder='Görseliniz (Zorunlu değildir fakat bir görsel koymadığınız taktirde gönderinize default resim atanır.)'
							type='text'
						/>
					</div>
					
					<br/><br/>
					
					<h6 style={{fontSize: "2.25vh"}}>Görseliniz (Zorunlu değildir fakat bir görsel koymadığınız taktirde gönderinize default resim atanır.)</h6>
						<button 
							className="btn waves-effect waves-dark" 
							type="submit" name="action"
							onClick={ () => postDetails() }>
							
							Gönderi Oluştur
						</button>
				</div>
			
		</div>
	)
}
