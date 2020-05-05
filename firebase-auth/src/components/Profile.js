import React from 'react';
import firebase from "firebase/app";
import "firebase/storage";
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import { AuthContext } from "../firebase/Auth";
import { useEffect, useContext, useState } from 'react';
import { getUser,updateProfilePic } from '../firebase/FirestoreFunctions';

const defpic = require('../assets/default-avatar.png')

function Profile() {
	const allInputs = {imgUrl: ''}

	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const [change, setChange] = useState(false);
	//const [defaultPic, setDefaultPic] = useState(defpic);
	const [profPic,setProfPic] = useState();
	const [profPicUrl,setProfPicUrl] = useState('');
	useEffect(() => {

		async function getData() {
			try {
				let u = await getUser(currentUser.uid);
				// console.log("HERE",u)
				setLoading(false)
				setUser(u);
				// if (u.photoURL !== "") {
				// 	setProfPicUrl(u.photoURL)
				// }
				if(profPicUrl!=='') {
					await updateProfilePic(currentUser.uid,profPicUrl);
				}
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, [currentUser,profPicUrl]);

	const handleChange = async (event) => {
		event.preventDefault();
		if (event.target.files[0]) {
			const profilePicture = event.target.files[0];
			setProfPic(profilePicture);
		}
	}

	const handleUpload = async (event) => {
		event.preventDefault();
		var metadata = {
			contentType: 'image/jpeg'
		  };
		var storageRef = firebase.storage().ref();
		const storage= firebase.storage();
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



	if (!loading) {
		return (
			<div className="container">
				<h2>Profile Page</h2>
				<div className="profile">
					{/* <img src={defaultPic} height="100" widht="100"/> */}
					{user && user.photoURL ? (<p>Profile Picture<img src={profPicUrl} alt='profilePic' height="100" width="100" /></p>) : (<p>Default Picture<br /><img src={defpic} alt='defaultpic' height="100" width="100" /></p>)}

					{user ? (<p>First Name: {user.firstName}  <br />Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
					{user && user ? (<div>MY POSTS: {user.posts.map((item) => {
						return (<div key="1">
							<p>Post Details: {item.title} : {item.value}</p>
							<p>Post Description: {item.description}</p>
						</div>)
					})}</div>) : (<p>NOT GETTING USER DATA</p>)}
				</div>
				<form onSubmit={handleUpload}>
					<input type='file' onChange = {handleChange} />
					<button>Apply changes</button>
				</form>

				<img src={profPicUrl.imgUrl} alt="image tag" />

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
