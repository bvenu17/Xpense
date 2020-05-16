import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from "../firebase/Auth";
import { addChat, getUser, getAllChats } from '../firebase/FirestoreFunctions';
import { socket } from "./Socket";

//let socket;

const Chat = () => {

    //user states
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState();
    //chat states
    const [message, setMessage] = useState('');
    const [allmsg, setAllmsg] = useState()
    //const [emited, setEmited] = useState(false);
    const [msgSent,setMsgSent] = useState();
    // const ENDPOINT = 'localhost:5000'
    //let socket;

    useEffect(() => {

        // socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false });
        console.log(socket);

        console.log("ek baar")
        //venus part
        async function getData() {

            try {
                console.log("enter use effect func")
                //fetch user details from db
                let u = await getUser(currentUser.uid);
                //setLoading(false)
                setUser(u);
                console.log("fetched user details", u);
            } catch (e) {
                console.log(e)
            }
            try {
                //fetch user details from db
                let data = await getAllChats();
                //setLoading(false)
                setAllmsg(data);
                console.log("fetched user details", data);
            } catch (e) {
                console.log(e)
            }
        }
        getData();
        //vend

        //socket.emit('input',msgSent);
        async function outMsg(){
            socket.off('output').on('output', chatData => {

               // console.log("emitEffect", emited)
                var message = document.createElement('div');
                message.textContent = chatData.name + " : " + chatData.message;
                var messages = document.getElementById('messagesList')
                messages.appendChild(message);
                console.log("Message hau " + chatData);
            })

        }
        outMsg();
        
    }, []);



    // useEffect(() => {
    //     socket.on('output', chatData => {

    //         console.log("emitEffect", user)
    //         var message = document.createElement('div');
    //         message.textContent = chatData.name + " : " + chatData.message;
    //         var messages = document.getElementById('messagesList')
    //         messages.appendChild(message);
    //         console.log("Message hau " + chatData);
    //     })
    // }, []);  

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message) {
            let chatData = { name: user.firstName, message: message }
            //setMsgSent(chatData);
            socket.emit('input', chatData,() => setMessage(''))
            //setEmited(!emited);

            //venus part
            // async function addChat() {
            try {
                console.log("Chat send effect")
                //fetch user details from db
                await addChat(chatData);
                //setLoading(false)
                // setUser(u);
                // console.log("fetched user details")
            } catch (e) {
                console.log(e)
            }
            // }
            // addChat();
            //vend

        }

    }

    // console.log("dusra kuch" + message);
    return (
        <div>
            <div>
                <div className='cardMsg' style={{ width: "100% ", overflow: "auto", whiteSpace: "nowrap", height: '20.0rem' }}>
                    <div id='messagesList' className='cardblock' style={{ display: "inline-block", width: '74%', height: '100px' }}>
                        {allmsg && allmsg.chatMessage.map((item) => {
                            return (
                                <div class = "comments">
                                    <div class = "comment chat">
                                        <span class = "userName"> {item.name} </span>
                                        <br></br>
                                        {item.message}
                                    </div>
                                </div>
                                // <div>{item.name} : {item.message}</div>
                            )
                        })}
                    </div>
                </div>
                {currentUser && currentUser ? (<div>
                    <input className = "form-control" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Enter message (Press Enter to Send)"
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                </div>) : (
                        <div>
                            <p>SignUp to chat!</p>
                        </div>
                    )}

            </div>
        </div>

    )
}

export default Chat;