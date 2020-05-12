//basic imports
import React, { useContext, useState, useEffect } from 'react';
//css import
import '../App.css';
import Button from 'react-bootstrap/Button';
//firebase functions import
import { AuthContext } from "../firebase/Auth";
import 'firebase/firestore';
import firebase from "firebase/app";
import "firebase/storage";
import { addPosts, getUser, getCollege, getAllColleges, getAllPosts, addCommentToPost } from '../firebase/FirestoreFunctions';
//static files import
const defcollogo = require('../assets/college-logo.jpg')


function Home() {
	//user states
	const { currentUser } = useContext(AuthContext)
	const [user, setUser] = useState();
	//college states
	const [college, setCollege] = useState();
	const [collegeList, setCollegeList] = useState();
	const [collegePic, setCollegePic] = useState(defcollogo);
	//post states
	const [postList, setPostList] = useState();
	const [postPic, setPostPic] = useState();
	const [postId, setPostId] = useState();
	const [postPicUrl, setPostPicUrl] = useState();
	//loading data state
	const [loading, setLoading] = useState(true);
	const [formSubmit, setFormSubmit] = useState(false);

	//lifecycle method
	useEffect(() => {
		async function getData() {
			try {
				console.log("Entering use effect at home")
				//fetch user details
				let u = await getUser(currentUser.uid);
				setUser(u);
				console.log("fetched user details")
				console.log(u)
				//fetch college details from db
				let allColleges = await getAllColleges();
				setCollegeList(allColleges)
				console.log("fetched college list")
				console.log(allColleges)
				//fetch all posts from db
				let p = await getAllPosts();
				setPostList(p);
				console.log("fetched all posts from db");
				console.log(p);
				//change loading state
				setLoading(false)
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, [currentUser, formSubmit])

	//onChange handler for input field of post picture
	const handleImageChange = async (event) => {
		event.preventDefault();
		if (event.target.files[0]) {
			const postPicture = event.target.files[0];
			setPostPic(postPicture);
		}
	}

	//submit form for post
	const handlePosts = async (event) => {
		event.preventDefault();
		//get all elements from form
		let { title, expenses, description, category, collegeSelect } = event.target.elements;
		console.log("College id is the foll " + collegeSelect.value)
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

						//retrieve values from the elements and add to post db
						let d = new Date();
						let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
						let month = months[d.getMonth()];
						let year=d.getFullYear();
						let day=d.getDate();
						let postDate=day+ ' ' + month + ' ' + year;
						let postTime = d.getHours() + ':' + (d.getMinutes()<10?'0':'')+ d.getMinutes();
						let post = {
							title: title.value,
							authorId: currentUser.uid,
							authorName: user.firstName + " " + user.lastName,
							collegeId: collegeSelect.value, comments: [],
							expenses: expenses.value,
							description: description.value,
							category: category.value,
							postPicture: fireBaseUrl,
							date: postDate,
							time:postTime
						};
						try {
							//add the post to the db
							addPosts(currentUser.uid, post);
							setFormSubmit(true);
						} catch (error) {
							alert(error);
						}
					})
			})
	};


	//submit form for comments
	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		const { comment } = event.target.elements;
		console.log("post id is" + postId + " comment value is " + comment.value + user.firstName)
		try {
			//add comment to the post db
			await addCommentToPost(postId, user.firstName, comment.value)
			setFormSubmit(true);
		} catch (error) {
			alert(error);
		}
	}

	//component code
	if (loading === false) {
		return (
			<div className='container container1'>
				{/* Rohan Static Content */}
				<div className="row">
					<div className="col-lg-8 col-md-12 col-sm-12">
						<div className="post">
							<div className="headerPost">
								<div className="avatarSide">
									<img src='/imgs/profile.png' className="avatarPic"></img>
								</div>
								<div className="personal">
									<div className="author"> Author Name Goes Here </div>

									<div className="college">College Name Goes here</div>
									<div className="time">Date and Time Go here!</div><br>
									</br>
								</div>
							</div>
							<div className="postContent" id="module">
								<p className="collapse" id="collapseExample" aria-expanded="false">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat dui ut lacus posuere pulvinar. Etiam eget malesuada ligula. Donec congue justo at tristique euismod. Pellentesque leo ipsum, rhoncus eu mattis sed, tincidunt id tellus. Ut facilisis urna vel maximus scelerisque. Duis nunc tortor, efficitur eget facilisis sit amet, finibus quis nisi. Quisque eget lorem eu dui rutrum ornare eu ac tortor. Suspendisse elit justo, volutpat id dignissim ac, aliquet sed mi. Aliquam elementum orci est, eget porta libero tempus a. Nullam libero lacus, ullamcorper vitae ipsum nec, posuere sagittis diam. Sed sed ex tristique ipsum hendrerit suscipit.
                                    <br></br> <br></br>
									Nam tincidunt neque id ultrices sollicitudin. Quisque nec quam enim. Curabitur ut eros vel augue porta congue. Praesent at aliquet ante. In sed urna nec mauris rhoncus feugiat vitae ullamcorper nisl. Sed blandit interdum mattis. Vestibulum vel molestie neque. Praesent condimentum, velit nec pellentesque gravida, libero ante pretium neque, ac faucibus tortor lorem ac nisl. Vivamus feugiat libero nunc, et efficitur ex consequat in. Phasellus ligula ex, porta vel risus sit amet, lacinia pharetra purus. Nulla ullamcorper nibh pharetra diam blandit dapibus.

                                    <br></br> <br></br>

									<i className="fas fa-shopping-cart icons" title="groceries"></i>$250 per month  GROCERIES

                                    <br></br>
									<i className="fas fa-home icons" title="rent"></i>$600 per month RENT
                                    <br></br>
									<i className="fas fa-wifi icons" title="internet"></i>$15 per month WIFI
                                    <br></br>
									<i className="fas fa-bolt icons" title="electricity"></i>$50 per month ELECTRICITY
                                    <br></br>
									<i className="fas fa-subway icons" title="transport"></i>15 min from PATH  TRANSPORT
                                    <br></br>
								</p>
								<a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>

							</div>
							<div className="comments">

								<br></br>
								<h2>COMMENTS GO HERE</h2>

	
							</div>
						</div>
					</div>
					{/* Rohan static copntent ends */}
					{/* Rohan code once again */}

					<div className="col-lg-4 col-md-12 col-sm-12">
						<div className="post">
							<h2>Share your experience living in the US</h2>
							<form onSubmit={handlePosts}>
								<div className='form-group'>
									<label htmlFor="title">
										Title
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
										Expenses
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
										Description
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
									<label for="collegeSelect"> Select your college</label>
									<select
										className='form-control'
										name='collegeSelect'
										id='collegeSelect'>
										{collegeList && collegeList.map((item) => {
											return <option value={item.id}>{item.name}</option>
										})}

									</select>
									<label for="post-image">Upload Media</label>
									<input required type="file" id="post-image" onChange={handleImageChange} /> <br></br>

									<br></br>
									<label for="category">Choose a category</label>

									<select id='category' name='category'>

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
								<div className="logSignButt">
									<Button variant="primary" type='submit' className="loginButt loginButt2"> POST </Button>


								</div>
							</form>
						</div>
						<br></br>
						<br></br>
						<div className="post">
							<h1>CHAT COMES HERE</h1>
						</div>
					</div>
				</div>



				{/* Rohan code ends again */}

				
				{/* Testing with all posts and comment*/}
				<h1>ALl Posts</h1>

				{postList && postList.map((item) => {
					return (
						<div className="postContent" style={{ border: '3px solid black', margin: '30px' }}>

							<p>
								Title: {item.title}
								<br></br>
								Author Name: {item.authorName}
								<br></br>
								Description: {item.description}
								<br></br>
								Date: {item.date}
								<br></br>
								Time:{item.time}
								<br></br>
								Category: {item.category}
								<br></br>
								Expense: ${item.expenses}
								<br></br>
								<img width="100px" src={item.postPicture} alt="img-post" />

							</p>
							<form onSubmit={handleCommentSubmit}>
								<input name="comment" id="comment" type="text" placeholder="enter comment" />

								{currentUser && currentUser ? (
									<button onClick={() => setPostId(item.id)} type="submit">Send comment</button>
								) : (
										<p>Login to add a comment</p>
									)}
							</form>
						</div>
					)
				})}
				{/* testing ends */}
			</div>

		)
	}
	else {
		return (
			<div className="container container1">
				<p>Home Loading....</p>
			</div>
		)
	}

}

export default Home;

