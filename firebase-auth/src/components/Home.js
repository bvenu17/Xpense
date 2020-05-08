import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import 'firebase/firestore';

import firebase from "firebase/app";
import "firebase/storage";
import { addPosts, getUser, getCollege, getAllColleges } from '../firebase/FirestoreFunctions';
import Button from 'react-bootstrap/Button';

const defcollogo = require('../assets/college-logo.jpg')


function Home() {
	const { currentUser } = useContext(AuthContext)
	const [user, setUser] = useState();
	const [college, setCollege] = useState();
	const [collegeList, setCollegeList] = useState();
	const [postList, setPostList] = useState();
	const [collegePic, setCollegePic] = useState(defcollogo);
	const [loading, setLoading] = useState(true);

	const [postPic, setPostPic] = useState();
	const [postPicUrl, setPostPicUrl] = useState();

	useEffect(() => {
		async function getData() {
			try {
				let collegeList = await getAllColleges();
				setCollegeList(collegeList)
				let u = await getUser(currentUser.uid);
				console.log('college id is ' + u.collegeId)
				let collegeDetails = await getCollege(u.collegeId);
				setPostList(collegeDetails.posts);
				console.log("get gollege dets");
				console.log(collegeDetails);
				setLoading(false)
				setUser(u);
				setCollege(collegeDetails)
				if (college.logo !== "") {
					setCollegePic(college.logo)
				}
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, [currentUser, collegePic])

	//onChange handler for input field of profile picture
	const handleImageChange = async (event) => {
		event.preventDefault();
		if (event.target.files[0]) {
			const postPicture = event.target.files[0];
			setPostPic(postPicture);
		}
	}

	const handlePosts = async (event) => {
		event.preventDefault();
		let { title, expenses, description, category } = event.target.elements;

		//upload post image to firebase
		const storage = firebase.storage();
		const uploadTask = storage.ref(`/postImages/${postPic.name}`).put(postPic);
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
				storage.ref('postImages').child(postPic.name).getDownloadURL()
					.then(fireBaseUrl => {
						//setProfPicUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
						setPostPicUrl(fireBaseUrl);
						// try {
						// 	updateProfilePic(currentUser.uid, fireBaseUrl);
						// } catch (error) {
						// 	alert(error);
						// }
						// console.log('firebase url i s' + fireBaseUrl);
						let post = { title: title.value, authorId: currentUser.uid, expenses: expenses.value, description: description.value, category: category.value, postPicture: fireBaseUrl };
						try {
							 addPosts(currentUser.uid, post);
						} catch (error) {
							alert(error);
						}
					})

			})


	};
	if (loading === false) {
		return (
			<div className='home'>
				<h2>This is the Home page</h2>
				YOUR DETAILS !!!
			{user ? (<p>First Name: {user.firstName}  <br />Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
				{user && user ? (<div> POSTS BY USER: {user.posts.map((item) => {
					return (<div key="1">
						<p>Post Detail: {item.title} : {item.value}</p>
						<p>Post Description: {item.description}</p>
					</div>
					)
				})}</div>) : (<p>NOT GETTING USER DATA</p>)}


				YOUR COLLEGE DATA !!!
			{college && college ? (<div>
					<p>Logo: {collegePic ? (<img src={collegePic} alt='collegepic' height="42" widht="42" />) : (<img src={collegePic} alt='defaultpic' height="42" width="42" />)}</p>
					<p>Name: {college.name}</p>
					<p>City: {college.city}</p>
					<p>Average Expenses: {college.avgExpense}</p>
					<div>POSTS ABOUT COLLEGE: {postList ? postList.map((post) => {
						return (<div key="1">
							<p>Post Title: {post.Title}</p>
							<p>Post Category: {post.Category}</p>
							<p>Post Description: {post.Description}</p>
						</div>
						)
					}) : (<p>NO POSTS</p>)
					}
					</div>

				</div>) : null}



				LIST OF COLLEGES !!!
			{collegeList && collegeList ? (<div>{collegeList.map((item) => {
					return (<div key={item.name}>
						<p>College Name: {item.name}</p>
						<p>College Logo: {item.logo === "" ? (<img src={item.logo} alt='collegepic' height="42" widht="42" />) : (<img src={collegePic} alt='defaultpic' height="42" widht="42" />)}</p>
					</div>
					)

				})}</div>) : (<p>NOT GETTING College DATA</p>)}



				<h2> ADD YOUR POSTS BELOW </h2>
				<form onSubmit={handlePosts}>
					<div className='form-group'>
						<label for="poost-image">Insert an image</label>
						<input required type="file" id="post-image" onChange={handleImageChange} /> <br></br>
						<label for="title">
							Title:
							</label>
						<input
							className='form-control'
							name='title'
							id='title'
							type='text'
							placeholder='Title'
							required
						/>
						<br></br>
						<label for="expenses">
							Expenses:
							</label>
						<input
							className='form-control'
							name='expenses'
							id='expenses'
							type='number'
							placeholder='Value'
							required
						/>
						<br></br>
						<label for="description">
							Description:
							</label>
						<input
							className='form-control'
							name='description'
							id='description'
							type='textarea'
							placeholder='Description'
							required
						/>
						<br></br>
						<label for="category">Choose a category</label>
						<select id='category' name='category'>
							{/* {category.map(item => (
							<option key={item.id} value={item.name}>
								{item.name}
							</option>
						))} */}
							<option key='rent' value='rent'>
								RENT
						</option>
							<option key='houses' value='houses'>
								HOUSES
						</option>
							<option key='groceries' value='groceries'>
								GROCERIES
						</option>
							<option key='transport' value='transport'>
								TRANSPORT
						</option>
						</select>
					</div>
					<Button variant="primary" type='submit'> Post </Button>
				</form>
				{/* <select id='college' name='college'>
						{colleges.map(item => (
							<option key={item.uid} value={item.name}>
								{item.name}
							</option>
						))}	
						</select> */}

			</div>
		)
	}
	else {
		return (
			<div>
				<p>Loading....</p>
			</div>
		)
	}

}

export default Home;

