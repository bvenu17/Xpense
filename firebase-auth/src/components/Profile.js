import React from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import { AuthContext } from "../firebase/Auth";
import {useEffect, useContext, useState} from 'react';
import {getUser} from '../firebase/FirestoreFunctions';



function Profile() {
	const {currentUser} = useContext(AuthContext);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const [change, setChange] = useState(false);
	
	useEffect(() => {
		
		async function getData() {
			try{
				let u = await getUser(currentUser.uid);
				// console.log(u)
				setLoading(false)
				setUser(u);
			}catch(e){
			console.log(e)
		}
	}
		getData();
	},[currentUser]);

	if(!loading){
	return (
		<div>
			<h2>Profile Page</h2>
			<div className="profile">
			{user ? (<p>First Name: {user.firstName}  <br/>Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
					{user && user ? (<div>MY POSTS: {user.posts.map((item) => {
						return (<div key="1">
									<p>Post Details: {item.title} : {item.value}</p>
									<p>Post Description: {item.description}</p>
								</div>)
					})}</div>) : (<p>NOT GETTING USER DATA</p>)}	 
			</div>
			
			{/* <button onClick={()=>changepwd(!change)}>Click to Change Password</button> */}
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
