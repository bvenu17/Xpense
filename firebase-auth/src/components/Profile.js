import React from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import { AuthContext } from "../firebase/Auth";
import {useEffect, useContext, useState} from 'react';
import {getUser} from '../firebase/FirestoreFunctions';

const defpic = require('../assets/default-avatar.png')

function Profile() {
	const {currentUser} = useContext(AuthContext);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const [change, setChange] = useState(false);
	const [defaultPic, setDefaultPic] = useState(defpic);
	
	useEffect(() => {
		
		async function getData() {
			try{
				let u = await getUser(currentUser.uid);
				// console.log("HERE",u)
				setLoading(false)
				setUser(u);
				if(u.photoURL !== ""){
					setDefaultPic(u.photoURL)
				}
			}catch(e){
			console.log(e)
		}
	}
		getData();
	},[currentUser]);

	if(!loading){
	return (
		<div className="container">
			<h2>Profile Page</h2>
			<div className="profile">
			{/* <img src={defaultPic} height="100" widht="100"/> */}
			{user && user.photoURL ? (<p>Profile Picture<img src={defaultPic} alt='profilePic' height="100" width="100" /></p>) : (<p>Default Picture<br/><img src={defaultPic} alt='defaultpic' height="100" width="100"/></p>)}

			{user ? (<p>First Name: {user.firstName}  <br/>Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
					{user && user ? (<div>MY POSTS: {user.posts.map((item) => {
						return (<div key="1">
									<p>Post Details: {item.title} : {item.value}</p>
									<p>Post Description: {item.description}</p>
								</div>)
					})}</div>) : (<p>NOT GETTING USER DATA</p>)}	 
			</div>
			{change ? <div><ChangePassword /> <button onClick={()=>setChange(!change)}>Hide</button></div> : <button onClick={()=>setChange(!change)}>Click to Change Password</button>} <br/>
			<SignOutButton />
		</div>
	);
}else{
	return( 
		<div>
		<p> Loading...</p>
		</div>
		)
	}
}

export default Profile;
