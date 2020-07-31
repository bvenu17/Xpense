import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../firebase/Auth";
import { Button, Modal } from 'react-bootstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { addChat, getUser, getAllChats } from '../firebase/FirestoreFunctions';
import { socket } from "./Socket";

//let socket;

const Chat = () => {

    //user states
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState();
    //login to chat
    const [logSign, setlogSign] = useState("Signup");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const setLogin = () => setlogSign("Login")
    const setSignup = () => setlogSign("SignUp")
    //chat states
    const [message, setMessage] = useState('');
    const [allmsg, setAllmsg] = useState()
    //const [emited, setEmited] = useState(false);
    const [msgSent, setMsgSent] = useState([]);
    // const ENDPOINT = 'localhost:5000'
    //let socket;

    useEffect(() => {

        // socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false });

        async function getData() {

            try {
                console.log("enter use effect func")
                //fetch user details from db
                if(currentUser) {
                let u = await getUser(currentUser.uid);
                //setLoading(false)
                setUser(u);
                console.log("fetched user details", u);
                }
            } catch (e) {
                console.log(e)
            }
            try {
                //fetch user details from db
                
                let data = await getAllChats();
                //setLoading(false)
                if(data){
                    setAllmsg(data);
                }
                else{
                    setAllmsg([])
                }
                console.log("fetched user details", data);
            } catch (e) {
                console.log(e)
            }
        }
        getData();

        async function outMsg() {
            socket.off('output').on('output', chatData => {

                setMsgSent(msgSent => [...msgSent, chatData]);
                //  s;
                // box.scrollTo(0, box.scrollHeight);
                // var message = document.createElement('div');
                // message.textContent = chatData.name + " : " + chatData.message;
                // var messages = document.getElementById('messagesList')
                // messages.appendChild(message);
                // console.log("Message hau " + chatData);
            })

        }
        outMsg();


    }, [currentUser]);



    const sendMessage = async (event) => {
        event.preventDefault();
        if (message) {
            let d = new Date();
            let chatTime = d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            let month = months[d.getMonth()];
            let day = d.getDate();
            let chatDate = day + ' ' + month;

            let chatData = { name: user.firstName, message: message, time: chatTime, date: chatDate }
            socket.emit('input', chatData, () => setMessage(''))

            try {
                console.log("Chat send effect")
                await addChat(chatData);

            } catch (e) {
                console.log(e)
            }

        }
    }

    return (
        <div>
            <div>
                <div className='cardMsg' style={{ width: "100% ", overflow: "auto", height: '25.0rem' }}>
                    <div id='messagesList' className='cardblock' style={{ display: "inline-block", width: '100%', height: '100px' }}>
                        {allmsg && allmsg ? (allmsg.chatMessage.map((item, i) => {
                            return (
                                <div key={i} className="comments">
                                    <div className="comment chat">
                                        <span className="userName"> {item.name} </span> 

                                        <br></br>
                                        {item.message}
                                        <br></br>
                                        <span className="time">{item.time}</span>
                                    </div>
                                </div>
                            )
                        })):(<p>No chat yet</p>)}
                        {/* {msgSent ? (<div class="comments">
                            <div class="comment chat">
                                <span class="userName"> {msgSent.name} </span>
                                <br></br>
                                <span>{msgSent.message}</span>
                            </div>
                        </div>) : (null)} */}
                        {msgSent && msgSent.map((text, i) => {
                            return (
                                <div key={i} className="comments">
                                    <div className="comment chat">
                            <span className="userName"> {text.name} </span>

                                        <br></br>
                                        {text.message}
                                        <br></br>
                                        <span className="time">{text.time}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {currentUser && currentUser ? (<div className="chat-control">
                    <label htmlFor="addComm"></label>
                    <input name="addComm" id="addComm" className="comment2" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Enter message..."
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <label htmlFor = "chatButt"></label>
                    <button name = "chatButt" id = "chatButt" onClick={(event) => sendMessage(event)} className="commentButt" type="submit"><i className="fas fa-paper-plane icons"></i></button>

                </div>) : (
                        <div className="chat-control">
                            {/* <p>SignUp to chat!</p> */}

                                <label htmlFor ="comment"></label>
                                <br></br><br></br>
                                <input name="comment" className='comment2' id="comment" type="text" placeholder="Enter message..." onClick={handleShow} />

                                <label htmlFor = "chatButt"></label>
                                <button name = "chatButt" id = "chatButt" className="commentButt" type="submit"><i className="fas fa-paper-plane icons" onClick={handleShow} ></i></button>
                                <Modal className="loginForm" show={show} onHide={handleClose} >
                                    <Button variant="primary" className="modalHeader" onClick={logSign === "Login" ? setSignup : setLogin}>
                                        {logSign === "Login" ? "Have an account? Login here" : "Don't have an account? Signup Now"}
                                    </Button>
                                    <div className="modalContent">
                                        {logSign === "Login" ? <SignUp></SignUp> : <SignIn></SignIn>}
                                    </div>
                                </Modal>

                        </div>
                    )}

            </div>
        </div>

    )
}

export default Chat;