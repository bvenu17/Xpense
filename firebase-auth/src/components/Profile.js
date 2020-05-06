import React from 'react';
import firebase from "firebase/app";
import "firebase/storage";
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import { AuthContext } from "../firebase/Auth";
import { useEffect, useContext, useState } from 'react';
import { getUser, updateProfilePic, updateAccountInfo } from '../firebase/FirestoreFunctions';

const defpic = require('../assets/default-avatar.png')

function Profile() {
	const allInputs = { imgUrl: '' }

	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const [change, setChange] = useState(false);
	const [profPic, setProfPic] = useState();
	const [profPicUrl, setProfPicUrl] = useState();
	// const [firstName, setFirstName] = useState();
	// const [lastName, setLastName] = useState();

	useEffect(() => {

		async function getData() {
			try {
				let u = await getUser(currentUser.uid);

				setLoading(false)

				setUser(u);


				console.log(profPicUrl);

				console.log("enter useeffect after getting user")
				if (profPicUrl !== null || profPicUrl !== undefined) {
					await updateProfilePic(currentUser.uid, profPicUrl);
				}
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, [currentUser]);


	//onChange handler for input field of profile picture
	const handleChange = async (event) => {
		event.preventDefault();
		if (event.target.files[0]) {
			const profilePicture = event.target.files[0];
			setProfPic(profilePicture);
		}
	}

	//submit function for profile picture form
	const handleUpload = async (event) => {
		event.preventDefault();
		var metadata = {
			contentType: 'image/jpeg'
		};
		var storageRef = firebase.storage().ref();
		const storage = firebase.storage();
		//var profilePictureRef = storageRef.child(`images/${profPic.name}`).put(profPic, metadata);
		const uploadTask = storage.ref(`/images/${profPic.name}`).put(profPic);
		console.log('img uploaded');

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on('state_changed',
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot)
			}, (err) => {
				//catches the errors
				console.log(err)
			}, () => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage.ref('images').child(profPic.name).getDownloadURL()
					.then(fireBaseUrl => {
						//setProfPicUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
						setProfPicUrl(fireBaseUrl);
						console.log(profPicUrl);
					})

			})
	}


	//
	// const accountInfoChange = async (event) => {
	// 	if (event.target.name == 'firstName') {
	// 		setFirstName(event.target.value);
	// 	}
	// 	if (event.target.name == 'lastName') {
	// 		setLastName(event.target.value);
	// 	}
	// }

	const updateAccountInfo = async (event) => {
			event.preventDefault();
		console.log('entering update acc func');
		//await updateAccountInfo(currentUser.uid,firstName,lastName);
		let { firstName, lastName } = event.target.elements;
		const first = firstName.value;
		const last = lastName.value;
		console.log("form data " + first + "  " + last);
		if (first && last) {
			try {
				await updateAccountInfo(currentUser.uid, first, last);
			} catch (error) {
				alert(error);
			}
		} else alert('enter all info');
	};


	if (!loading) {
		return (
			<div className="container">
				<h2>Profile Page</h2>
				<div className="profile">
					{/* <img src={defaultPic} height="100" widht="100"/> */}
					{user && user.photoURL ? (<p>Profile Picture<img src={user.photoURL} alt='profilePic' height="100" width="100" /></p>) : (<p>Default Picture<br /><img src={defpic} alt='defaultpic' height="100" width="100" /></p>)}
					<form onSubmit={handleUpload}>
						<input type='file' onChange={handleChange} />
						<button style={{ border: '3px solid black' }}>Change profile picture</button>
					</form>
					{user ? (<p>First Name: {user.firstName}  <br />Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
					{user && user.posts ? (<div>MY POSTS: {user.posts.map((item) => {
						return (<div>
							<p>Post Details: {item.title} : {item.value}</p>
							<p>Post Description: {item.description}</p>
						</div>)
					})}</div>) : (<p>NOT GETTING any posts</p>)}
				</div>

				<h2>Edit account info</h2>
				<form onSubmit={updateAccountInfo} >
					<label for="firstName">First Name:</label>
					<input type="text" id="firstName"  name="firstName" placeholder="Enter your first name" />
					<br></br>
					<label for="lastName">Last Name:</label>
					<input type="text" id="lastName" name="lastName" placeholder="Enter your last name" />
					<br>
					</br>
					<button type='submit'>Apply changes</button>
				</form>



				<br></br>
				{change ? <div><ChangePassword /> <button onClick={() => setChange(!change)}>Hide</button></div> : <button onClick={() => setChange(!change)}>Click to Change Password</button>} <br />
				<SignOutButton />
			</div>
		);
	} else {
		return (
			<div>
				<p> Loading...</p>
			</div>
		)
	}
}

export default Profile;
