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
//import other components
import Chat from './Chat';
//static files import
const defcollogo = require('../assets/college-logo.jpg')


function Home() {
	//user states
	const { currentUser } = useContext(AuthContext)
	const [user, setUser] = useState();
	//college states
	const [collegeName, setCollegeName] = useState();
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
	//filter posts
	const [options, setOptions] = useState();
	const [postFilter, setPostFilter] = useState();

	//lifecycle method
	useEffect(() => {
		let optionFilter = new Set();
		async function getData() {
			try {
				console.log("Entering use effect at home")
				//fetch user details
				let u = await getUser(currentUser.uid);
				setUser(u);
				console.log("fetched user details", u)
				//fetch college name of the user
				if (u.collegeId) {
					let cname = await getCollege(u.collegeId);
					setCollegeName(cname.name);
				}
				//fetch college details from db
				let allColleges = await getAllColleges();
				setCollegeList(allColleges)
				console.log("fetched college list", allColleges)
				//fetch all posts from db
				let p = await getAllPosts();
				setPostList(p);
				console.log("fetched all posts from db", p);
				//filter for dropdown
				allColleges.forEach((college) => {
					optionFilter.add(college.state);
				});
				optionFilter = [...optionFilter]
				setOptions(optionFilter);
				console.log(optionFilter)
				// fetch user's college
				// while(!user){
				// let uColg = await getCollege(currentUser.collegeId);
				// setCollege(uColg);
				// console.log("fetched current user's college")
				// console.log(uColg);}
				//change loading state
				setLoading(false)
			} catch (e) {
				console.log(e)
			}
		}
		// console.log("CURR",currentUser.collegeId)
		// console.log("COLLEGE",college)
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
		let { title, description, rent, groceries, transport, utilities } = event.target.elements;
		let collegeDetails = await getCollege(user.collegeId);
		//console.log("College id is the foll " + collegeSelect.value)
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
						setPostPicUrl(fireBaseUrl);
						//retrieve values from the elements and add to post db
						let d = new Date();
						let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
						let month = months[d.getMonth()];
						let year = d.getFullYear();
						let day = d.getDate();
						let postDate = day + ' ' + month + ' ' + year;
						let postTime = d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

						let post = {
							title: title.value,
							authorId: currentUser.uid,
							authorName: user.firstName + " " + user.lastName,
							collegeId: user.collegeId,
							collegeName: collegeDetails.name,
							comments: [],
							description: description.value,
							postPicture: fireBaseUrl,
							date: postDate,
							time: postTime,
							rent: rent.value,
							groceries: groceries.value,
							transport: transport.value,
							utilities: utilities.value,
							userProfilePic: user.photoURL,
							collegeName: collegeName
						};
						try {
							//add the post to the db
							addPosts(currentUser.uid, post);
							setFormSubmit(!formSubmit);
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
			setFormSubmit(!formSubmit);
		} catch (error) {
			alert(error);
		}
	}

	// func to filter posts by location
	const filterPost = async (event) => {
		event.preventDefault();
		let target = event.target.value;
		let cid = [];
		let posts_filter = [];
		if (target === "NONE") {
			setPostFilter(undefined)
			return
		}

		collegeList.map((college) => {
			if (college.state === target) {
				cid.push(college.id);
			}
		});

		cid.forEach((id) => {
			postList.map((post) => {
				if (id === post.collegeId) {
					posts_filter.push(post);
				}
			});
		});
		setPostFilter(posts_filter);
	}



	//component code
	if (loading === false) {
		return (
			<div className='container container1'>
				{/* Rohan Static Content */}
				<div className="row">
					<div className="col-lg-8 col-md-12 col-sm-12">
						{/* <div className="post">
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
						</div>  */}

						<h3> FILTER POSTS HERE !!</h3>
						<div className="d-flex justify-content-end">
						<form id='locationFilter'>
							<select className="form-control" id='filterPost' form='locationFilter' onChange={filterPost}>
								<option key='default' defaultValue='None'>NONE</option>
								{options.map((item) => {
									return (
										<option key={item}>{item}</option>
									)
								})}
							</select>
						</form>
						</div>
						
						<br></br>

						{postFilter ? postFilter.map((item) => {
							return (
								<div className="post">
									<div className="postContent">
										<p>User profile pic</p>
										<img src={item.userProfilePic} alt="img"></img>
										<p>
											Title : {item.title}
											<br></br>
													Author Name : {item.authorName}
											<br></br>
													Description : {item.description}
											<br></br>
													Date : {item.date}
											<br></br>
													Time:{item.time}
											<br></br>
													CollegeName: {item.collegeName}
											<br></br>

											<br></br>
											<img width="100px" src={item.postPicture} alt="img-post" />
											<br></br>
											<i className="fas fa-shopping-cart icons" title="groceries"></i>  {item.groceries}
											<br></br>
											<i className="fas fa-home icons" title="rent"></i>  ${item.rent} per month Rent
											<br></br>
											<i className="fas fa-bolt icons" title="utlities"></i>  ${item.utilities} per month Utilities
											<br></br>
											<i className="fas fa-subway icons" title="transport"></i>  {item.transport}
											<br></br>
										</p>

										<div className="comments">

											<br></br>
											<h2>COMMENTS GO HERE</h2>
											<div>
												{item.comments ? (
													item.comments.map((comm) => {
														return (
															<div style={{ border: "3px solid black", margin: "20px" }}>
																<p>
																	<b>{comm.username} </b>
																	<br></br>
																	{comm.comment}
																</p>
															</div>
														)
													})
												) : (<p>No comments to display</p>)}
											</div>
											<form onSubmit={handleCommentSubmit}>
												<input name="comment" id="comment" type="text" placeholder="enter comment" />
												<button onClick={() => setPostId(item.id)} type="submit">Send comment</button>
											</form>
										</div>
									</div>
								</div>
							)
						}) : (postList.map((item) => {
							return (
								<div className="post">
									<div className="postContent">
										<p>User profile pic</p>
										<img src={item.userProfilePic} alt="img"></img>
										<p>
											Title : {item.title}
											<br></br>
													Author Name : {item.authorName}
											<br></br>
													Description : {item.description}
											<br></br>
													Date : {item.date}
											<br></br>
													Time:{item.time}
											<br></br>
													CollegeName: {item.collegeName}
											<br></br>

											<br></br>
											<img width="100px" src={item.postPicture} alt="img-post" />
											<br></br>
											<i className="fas fa-shopping-cart icons" title="groceries"></i>  {item.groceries}
											<br></br>
											<i className="fas fa-home icons" title="rent"></i>  ${item.rent} per month Rent
											<br></br>
											<i className="fas fa-bolt icons" title="utlities"></i>  ${item.utilities} per month Utilities
											<br></br>
											<i className="fas fa-subway icons" title="transport"></i>  {item.transport}
											<br></br>
										</p>

										<div className="comments">

											<br></br>
											<h2>COMMENTS GO HERE</h2>
											<div>
												{item.comments ? (
													item.comments.map((comm) => {
														return (
															<div style={{ border: "3px solid black", margin: "20px" }}>
																<p>
																	<b>{comm.username} </b>
																	<br></br>
																	{comm.comment}
																</p>
															</div>
														)
													})
												) : (<p>No comments to display</p>)}
											</div>
											<form onSubmit={handleCommentSubmit}>
												<input name="comment" id="comment" type="text" placeholder="enter comment" />
												<button onClick={() => setPostId(item.id)} type="submit">Send comment</button>
											</form>
										</div>
									</div>
								</div>
							)
						}))
						}
					</div>
					{/* Rohan static copntent ends */}
					{/* Rohan code once again */}

					<div className="col-lg-4 col-md-12 col-sm-12">
						<div className="post">
							<form onSubmit={handlePosts}>
								<div className='form-group'>
									<label htmlFor="title">Title</label>
									<input className='form-control' name='title' id='title' type='textarea' placeholder='Title' required />
									<br></br>

									<label for="description">Description</label>
									<input className='form-control' name='description' id='description' type='textarea' placeholder='Description' required />
									<br></br>


									<label for="college"> Your College</label>
									{user.collegeId ? (collegeList.map((item) => {
										if (user.collegeId === item.id) {
											return (
												<p>{item.name}</p>
											)
										}
									})) : (<p>Please provide your college name !</p>)}

									<label for="rent">Rent</label>
									<input className='form-control' name='rent' id='rent' placeholder='$' type='number' required />
									<br></br>

									<label for="transport">Transport</label>
									<input className='form-control' name='transport' id='transport' placeholder='Eg: NJ Transport, Port-Authority Bus...' type='text' required />
									<br></br>

									<label for="utilities">Utilities</label>
									<input className='form-control' name='utilities' id='utilities' placeholder='$' type='number' required />
									<br></br>

									<label for="groceries">Grocery Stores</label>
									<input className='form-control' name='groceries' id='groceries' placeholder='Eg: Stop-N-Shop, Shop-rite...' type='text' required />
									<br></br>


									<label for="post-image">Upload Media</label>
									<input required type="file" className="form-control-file" id="post-image" onChange={handleImageChange} /> <br></br>
									<br></br>

								</div>

								<div className="logSignButt">
									{user.collegeId && user.collegeId ? collegeList.map((item) => {
										if (item.id === user.collegeId)
											return (
												<Button variant="primary" type='submit' className="loginButt loginButt2"> POST </Button>
											)
									}) : (<p>You cannot Post... You have not provided your college details</p>)}

								</div>


							</form>
						</div>
						<br></br>
						<br></br>
						<div className="post">
							<h1>CHAT COMES HERE</h1>
							<Chat></Chat>
						</div>
					</div>
				</div>
				{/* Rohan code ends again */}

			</div>

		)
	}
	else {
		return (
			<div className="container container1">
				<img width="10%" src="/imgs/loading.gif" alt="img" />
			</div>
		)
	}

}

export default Home;

