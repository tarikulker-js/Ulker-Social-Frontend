import React, { useState, useEffect, useContext } from 'react';
import M from 'materialize-css';
import { UserContext } from '../../App.js';
import axios from 'axios';
import '../../App.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

export default function Home(){
	const [logined, setLogined] = useState(false)
	const [data, setData] = useState([]);
	const [createdAt, setCreatedAt] = useState("");
	const {state,dispatch} = useContext(UserContext);
	
	const user = JSON.parse(localStorage.getItem("user"));

	const userId = localStorage.getItem("userId");
	
	useEffect(() => {
		if(user === null){
			window.location="/signin";
		}
		
		fetch(`${API_URL}/getsubpost`, {
			type: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			//console.log("POSTS: ", result)
			setData(result.posts);
			
			
		})
		.catch(err => {
			//console.log(err)
		})
		
	}, [])
	
	const likePost = (id)=>{
			 fetch(`${API_URL}/like`,{
				  method:"put",
				  headers:{
						"Content-Type":"application/json",
						"Authorization":"Bearer "+localStorage.getItem("jwt")
				  },
				  body:JSON.stringify({
						postId:id
				  })
			 }).then(res=>res.json())
			 .then(result=>{
				const newData = data.map(item=>{
					 if(item._id==result._id){
						  return result
					 }else{
						  return item
					 }
				})
				setData(newData)
			 }).catch(err=>{
				//console.log(err)
		  })
	}
	
	const unlikePost = (id)=>{
			 fetch(`${API_URL}/unlike`,{
				  method:"put",
				  headers:{
						"Content-Type":"application/json",
						"Authorization":"Bearer "+localStorage.getItem("jwt")
				  },
				  body:JSON.stringify({
						postId:id
				  })
			 }).then(res=>res.json())
			 .then(result=>{
				//   //console.log(result)
				const newData = data.map(item=>{
					 if(item._id==result._id){
						  return result
					 }else{
						  return item
					 }
				})
				setData(newData)
			 }).catch(err=>{
				//console.log(err)
		  })
	}
	
	const makeComment = (text,postId)=>{
		if(text === ""){
			M.toast({html: "Boş yorum gönderilmez oqlim.", classes: "red"})
		}else if(text.length > 0){
			fetch(`${API_URL}/comment`,{
			method:"put",
			headers:{
				"Content-Type": "application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId: postId,
				text: text
			})
		}).then(res=>res.json())
		.then(result=>{
			//console.log(result)
			const newData = data.map(item=>{
				if(item._id==result._id){
					return result
				}else{
					return item
				}
			})
			
			M.toast({html: "Başarıyla yorum yapıldı.", classes: "green"})
			
			setData(newData)
			
			})
			.catch(err=>{
				//console.log(err)
			})
		}
		
	}
	
	const deletePost = (postId) => {
		//${API_URL}
		
		fetch(`${API_URL}/deletepost/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			//console.log(result);
			
			if(result.message){
				M.toast({html: result.message, classes: "green"});
				
				window.location="/logout";
			}
			
			const newData = data.filter(item => {
				return item._id !== result._id
			})
			
			setData(newData)
		})
		
	}
	
	return(
		<div className='myFollowingPosts'>
			
			<center>
				{
					data
						?
					
					data.length !== null  ?
						
						data.map(item => {
							return(
								<div className='card home-card'>

								<img 
									src={item.postedBy.pic} 
									className='profileImg pointer'
									style={{width: '35px', height: '35px', borderRadius: '50%', float: 'left', margin: "15px"}}
								/>
								
						{
										item.postedBy._id !== null ? 
											<h5 className='username'><Link to={ "/user/"+item.postedBy._id }>{item.postedBy.name}</Link></h5>
										:
										
										<h5 className='username'>Yükleniyor...</h5>
						}
								
								{item.postedBy._id === userId && <i className="material-icons"
											 onClick={()=>{deletePost(item._id)}}
											 >delete</i>}
				
								<div className='card-image'>
									
										{
											item.likes.includes(userId)
										
											 ? 
												
											  <img src={ item.picture } onDoubleClick={() => unlikePost(item._id)}/>
												
											 : 
											
											 <img src={ item.picture } onDoubleClick={() => likePost(item._id)}/>
										}
									
								</div>
								<div className='card-content'>
									
									<div style={{float: "left", display: "flex"}}>

									</div>

									<div className='events'>
										
										{
											item.likes.includes(userId)
											 ? 
											  
												<img 
												 className="material-icons pointer"
												 height="50px"
												 width="50px"
												 src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619613479/7E3B1AAE-7096-4EDD-B753-625FCDD8B2F0_ongcsr.png"
											 	 onClick={()=>{unlikePost(item._id)}}
												></img>
												
											 :
											
											<img 
											 	 className="material-icons pointer"
												 height="50px"
												 width="50px"
				src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619613106/9C0DF1E9-B878-49EC-ADAA-6B2267675DE1_lsme67.png"
											 	 onClick={()=>{likePost(item._id)}}
											 ></img>
									 	}
									
									</div>
									
									<br/><br/><br/>
									
									<h6 style={{float: "left", margin: "5px"}} >{item.likes.length} Likes</h6>
									
									<br/><br/>
									
									<h6 style={{float: "left", margin: "5px"}}>{item.postedBy.name}: {item.title}</h6>
									
									<br/>
									
									<p style={{float: "left", margin: "10px"}} >{item.body}</p>
									
									<br/><br/><br/>
									
									<div className='comments' style={{float: "left"}}>

										{
											item.comments.map(comment => {
												return(
													<div>
														<h6 key={comment._id} style={{float: "left"}}>
															<span style={{fontWeight: "500", float: "left"}}>{comment.postedBy.name}: </span> {comment.text}
														</h6>
														
														<br/><br/>
													</div>
												)
											})
										}

									</div>
									
									<br/><br/><br/><br/>

									<div className="addComment">
										<form onSubmit={(e)=>{
											e.preventDefault()
											makeComment(e.target[0].value,item._id)
										}}>
											<input 
												type='text'
												placeholder='Bir yorum ekleyin'
											/>
										</form>
									</div>
									
									<div className="createdAt">
										<h6 style={{fontSize: "2vh", float: "left"}}>Oluşturma Tarihi: {item.createdAt ? item.createdAt.substring(0,10) : item.updatedAt.substring(0,10)} {item.createdAt ? Number(item.createdAt.substring(11,13)) + 3 : Number(item.updatedAt.substring(11,13)) + 3}:{item.createdAt ? item.createdAt.substring(14,16): item.updatedAt.substring(14,16)}</h6>
									</div>
									
									<br/>
									
								</div>
							</div>
						
							)
						})
					
					:
					
					
					<div className='loading'>
						
						<img 
							src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"
							
							height="225px"
							width="300px"
						/>
						
						<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>
					</div>
					
					:
					
					window.location="/signin"
					
				}
				{
					data.length === 0 ?
					
						<h4>Takip ettiklerinizin hiç postu yok</h4>
					
					:
					
						<h4></h4>
				}
			</center>
			
		</div>
	)
}