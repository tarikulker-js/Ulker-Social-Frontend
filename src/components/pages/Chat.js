import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import { API_URL } from '../../config';
import '../../App.css'
import SocketIO from "socket.io-client";

const Server = API_URL;
const socket = SocketIO(API_URL, { transports: [ 'websocket', 'polling', 'flashsocket']});


export default function DirectSend(){
	const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        axios.get(API_URL + "/get-messages")
        .then((lastMessages) => {
            console.log(lastMessages);

            lastMessages.data.map((lastMessage) => {
                console.log(lastMessage);
                
                setMessages(messages => [...messages, { message: lastMessage.data.message, author: lastMessage.author }] );
            })
        })
        socket.on('message', (data) => {
          console.log(data);

          const getedAuthor = data.author;
          const getedMessage = data.data.message;    
          
          setMessages(messages => [...messages, { message: getedMessage, author: getedAuthor }] );
    
          console.log("messages", messages);
    
        })
        
      }, []);
    
    const sendMessage = (e) => {
        console.log('clicked');
    
        socket.emit('message', {
          message,
          author: localStorage.getItem('userId')
        })
        e.preventDefault()
    
        setMessage("");
    }

    const user = JSON.parse(localStorage.getItem("user"));

	const userId = localStorage.getItem("userId");
	
	useEffect(() => {
		if(user === null || userId === null){
			window.location="/signin";
		}
    })

    const renderChat = () => {
        console.log(messages)
        return messages.map((mapedMessage) => (
            <div>
                <div className='message' style={{ display: "flex", float: 'left' }} >
                    <h6 style={{ display: 'flex'}}>{mapedMessage.author.name}: <span><p>{mapedMessage.message}</p></span></h6>
                </div>
                <br /><br />
            </div>
        ))
    }
	
	return(
		<div>
			<center>
				<h3>Ulker Social Chat'e Hoşgeldiniz!</h3>

                <div className="card" style={{ width: window.innerWidth }}>
                    <div className="card-content">
                        {messages.length == 0 ? <h2>Yükleniyor</h2> : <></>}
                        {renderChat()}

                        
                        <div style={{ display: 'flex', position: 'fixed', bottom: 0, left: 0, width: window.innerWidth }}>
                            <form  style={{ display: 'flex', position: 'fixed', bottom: 0, left: 0, width: window.innerWidth }}>
                                <input type="text" placeholder="Mesaj Gönder" value={message} onChange={(e) => setMessage(e.target.value)} /> <button onClick={sendMessage}>Gönder</button>
                            </form>
                        </div>
                        

                    </div>
                </div>
			</center>

		</div>
	)
}


