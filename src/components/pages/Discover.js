import React, { useState, useEffect, useContext } from 'react';
import M from 'materialize-css';
import { UserContext } from '../../App.js';
import axios from 'axios';
import '../../App.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

export default function Discover(){
	const [data, setData] = useState([]);
	const {state,dispatch} = useContext(UserContext)
	
	const user = JSON.parse(localStorage.getItem("user"));
	const userId = localStorage.getItem("userId");
	
	useEffect(() => {
		
		fetch(`${API_URL}/allpost`, {
			type: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		}).then(res => res.json())
		.then(result => {
			console.log("POSTS: ", result)
			setData(result.posts);
		})
		.catch(err => {
			console.log(err)
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
				//   console.log(result)
				const newData = data.map(item=>{
					 if(item._id==result._id){
						  return result
					 }else{
						  return item
					 }
				})
				setData(newData)
			 }).catch(err=>{
				console.log(err)
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
				//   console.log(result)
				const newData = data.map(item=>{
					 if(item._id==result._id){
						  return result
					 }else{
						  return item
					 }
				})
				setData(newData)
			 }).catch(err=>{
				console.log(err)
		  })
	}
	
	const makeComment = (text,postId)=>{
		console.log('yorum gรถnder');
   	
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
			console.log(result)
			const newData = data.map(item=>{
				if(item._id==result._id){
					return result
				}else{
					return item
				}
			})
			
			setData(newData)
			
			text = "";
			
			}).catch(err=>{
				console.log(err)
			})
		
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
			console.log(result);
			
			if(result.message){
				M.toast({html: result.message, classes: "green"})
			}
			
			const newData = data.filter(item => {
				return item._id !== result._id
			})
			
			setData(newData)
		})
		
	}
	
	return(
		<div className='home'>
			
			<center>
				{
					console.log("DATA", data),
						
					data.length !== null  ?
						
						data.map(item => {
							return(
								<div className='card home-card'>
								{
									
								<img 
									src={item.postedBy.pic} 
									className='profileImg'
									
									style={{width: '35px', height: '35px', borderRadius: '50%', float: 'left'}}
								/>
									
								}
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
											//Up: https://res.cloudinary.com/doaf7ybhd/image/upload/v1619613479/7E3B1AAE-7096-4EDD-B753-625FCDD8B2F0_ongcsr.png
											
											//Down: https://res.cloudinary.com/doaf7ybhd/image/upload/v1619613106/9C0DF1E9-B878-49EC-ADAA-6B2267675DE1_lsme67.png
											
											item.likes.includes(userId)
											 ? 
											  
												<img 
												 className="material-icons"
												 height="50px"
												 width="50px"
												 src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619613479/7E3B1AAE-7096-4EDD-B753-625FCDD8B2F0_ongcsr.png"
											 	 onClick={()=>{unlikePost(item._id)}}
												></img>
												
											 :
											
											<img 
											 	 className="material-icons"
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
									
									<br/><br/>
									
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
				}
			</center>
		</div>
	)
}