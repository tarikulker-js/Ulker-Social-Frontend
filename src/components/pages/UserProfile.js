import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App';
import {useParams} from 'react-router-dom';
import { FaUserAstronaut } from "react-icons/fa";
import { API_URL } from '../../config';

const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null);
	 const [myProfile, setMyProfile] = useState(false);
    const {state,dispatch} = useContext(UserContext)
    const { userid } = useParams()
	 const user = localStorage.getItem("user");
	 const myUserId = localStorage.getItem("userId");
	 const following = localStorage.getItem('following');
	 
 	 const [showFollow, setShowFollow] = useState(!localStorage.getItem("includesFollowing"));
	 
    useEffect(()=>{
		 
		 console.log(showFollow)
		
		 fetch(`${API_URL}/user/${myUserId}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
          setProfile(result)
			 
			 console.log(result.user)
			 
			 const includes = result.user.following.includes(userid);
			 
			 localStorage.setItem("includesFollowing", includes);
			 
			 console.log("INCLUDES", includes)
			 
       })
		
		 
		 if(userid === myUserId){
			 setMyProfile(true)
		 }else{
			 setShowFollow(true);
		 }
		 
		 console.log("LOCALSTORAGE ID", user.token);
		 console.log("PARAMS ID", userid)
		 
		 if(userid === user.user){
			 window.location='/profile'
		 }
		 
       fetch(`${API_URL}/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
          setProfile(result)
		 })
		 
    },[])


    const followUser = ()=>{
        fetch(`${API_URL}/follow`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
				
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                       }
                }
            })
			  
			   setShowFollow(false)
			  
        })
    }
    const unfollowUser = ()=>{
        fetch(`${API_URL}/unfollow`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
               const newFollower = prevState.user.followers.filter(item=>item != data._id )
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                       }
                }
            })
			  
			  setShowFollow(true)
			  
        })
    }
	 
	 
   return (
       <div style={{
				width: "90%",
				height: "100vh"
			}}>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                  
						<img 
							className="profileImg" 
							style={{width:"160px",height:"160px",borderRadius:"80px"}}
                  	src={ userProfile.user.pic }
                  />
						
               </div>
               <div>
                   <h5 style={{
								fontSize: "3vh"
							}}>{userProfile.user.name}</h5>
                   <h6 style={{
								fontSize: "2vh"
							}}>{userProfile.user.email}</h6>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length !== null ? userProfile.posts.length :<h4>Yükleniyor...</h4>} posts</h6>
                       <h6>{userProfile.user.followers.length !== null ? userProfile.user.followers.length : <h4>Yükleniyor...</h4>} Takipçi</h6>
                       <h6>{userProfile.user.following.length !== null ? userProfile.user.following.length : <h4>Yükleniyor...</h4>} Takip</h6>
                   </div>
                   
						{
							myProfile === false 
							
							?
								
							showFollow === true
								? 
								<button 
									 style={{
										  margin:"6px"
									 }} 
									  className="btn waves-effect waves-light #64b5f6 blue darken-1"
									  onClick={()=>followUser()}
								  >
										Takip Et
							  </button>
								
								:
								
								<button 
									 style={{
										  margin:"6px"
									 }} 
									  className="btn waves-effect waves-light #64b5f6 blue darken-1"
									  onClick={()=>unfollowUser()}
								  >
										Takibi Bırak
								  </button>
							
							:
							
							<div></div>
							
						}

               </div>
           </div>
     
           <div className="gallery">
               {
					  userProfile !== null 
						  
						  ?
						  
							userProfile.posts.map(item=>{
								return(
									<img key={item._id} className="item" src={item.picture} alt={item.title}/>  
							   )
							})

						  :
							<div className='loading'>
								<center>
									<img 
										src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

										height="100px"
										width="150px"
									/>

									<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>
									
									</center>

							</div>
					  
               }

           
           </div>
       </div>
       
       
       :
		  
		  
		   <div className='loading'>
	
				<center>
					<img 
					src="https://res.cloudinary.com/doaf7ybhd/image/upload/v1619649099/6EE61733-6F43-40B6-B49E-63A9C737E251_a1b5fz.gif"

						height="100px"
						width="150px"
					/>

					<h5 style={{fontSize: "2vh"}}>Yükleniyor...</h5>


					</center>

				</div>
		 }
       
       </div>
   )
}


export default Profile