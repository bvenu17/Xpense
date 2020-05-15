//basic imports
import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
//css import
import '../App.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Modal } from 'react-bootstrap';
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
	//post allow/disallow
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	//loading data state
	const [loading, setLoading] = useState(true);
	const [formSubmit, setFormSubmit] = useState(false);
	//filter posts
	const [options, setOptions] = useState();
	const [postFilter, setPostFilter] = useState();
	//post filter rent range
	const [rentValue, setRentValue] = useState(0);


	//lifecycle method
	useEffect(() => {
		let optionFilter = new Set();
		// let rentList = [];
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

				// console.log("RENT EFFECT",typeof(p[0].rent))
				//filter by rent
				// if(rentValue>0){
				// 	p.forEach((post) => {
				// 		console.log("HERE")
				// 		if(parseInt(post.rent) <= rentValue)
				// 		console.log("THEN HERE")
				// 			rentList.push(post)
				// 	})
				// 	setPostList(rentList)
				// 	console.log(rentList)
				// }
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
		let { title, description, rent, groceries, transport, utilities,postImage } = event.target.elements;
		let collegeDetails = await getCollege(user.collegeId);
		//console.log("College id is the foll " + collegeSelect.value)
		//upload post image to firebase
		const storage = firebase.storage();
		const imageName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + postPic.name;
		const uploadTask = storage.ref(`/postImages/${imageName}`).put(postPic);
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
				storage.ref('postImages').child(imageName).getDownloadURL()
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
						title.value = "";
						description.value = "";
						rent.value = "";
						groceries.value = "";
						transport.value = "";
						utilities.value = "";
						postImage.value="";

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
		comment.value = "";
	}

	// func to filter posts by location
	const filterPost = async (event) => {
		event.preventDefault();
		let target = event.target.value;
		let cid = [];
		let posts_filter = [];
		if (target === "Location") {
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
						<div class = "row">
							<div class = "col-lg-6 col-md-6 col-sm-3 col-xs-3">
							<label> FILTER BY LOCATION </label>
							</div>
							<div class = "col-lg-6 col-md-6 col-sm-9 col-xs-9">
						
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
				            <br></br>
							
							</div>
						</div>
						


						<br></br>
						<div className="col-lg-8 col-md-12 col-sm-12">
						{postFilter ? postFilter.map((item) => {
							return (
								
								<div className="post">
										<div className="headerPost">
											<div className="avatarSide">
												<img src={item.userProfilePic} className="avatarPic" alt = "profilePic"></img>
											</div>
											<div className="personal">
												<div className="author"> {item.authorName} </div>

												<div className="college">{item.collegeName}</div>
												<div className="time">{item.time}, {item.date}</div><br>
												</br>
											</div>
										</div>
									<div className="postContent" id = "module">
					
									<p class = "postTitle">
								    {item.title}
									</p>
									<p className="collapse" id="collapseExample" aria-expanded="false">
								
									{item.description}
									<br></br>
									<Carousel>
											<Carousel.Item>
											<img width="100%" src={item.postPicture} alt="img-post" />
											</Carousel.Item>
											<Carousel.Item>
											<img width="100%" src={item.postPicture} alt="img-post" />
											</Carousel.Item>
											<Carousel.Item>
											<img width="100%" src={item.postPicture} alt="img-post" />
											</Carousel.Item>
										</Carousel>
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
											<a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>

									</div>	
									
											
											
									

										<div className="comments">

										<br></br>
											<label>COMMENTS</label>
											<div>
												{item.comments ? (
													item.comments.map((comm) => {
														return (
															<div class = "comments">
																<div class = "comment">
																
																	<span class = "userName">{comm.username}</span> 
																	<br></br>
																	{comm.comment}
																</div>
															</div>
														)
													})
												) : (<p>No comments to display</p>)}
											</div>
											<form onSubmit={handleCommentSubmit}>
											
												<input name="comment" className='comment2' id="comment" type="text" placeholder="Add a comment..." />	
											
												<button onClick={() => setPostId(item.id)} class = "commentButt" type="submit"><i class="fas fa-paper-plane icons"></i></button>
							
										</form>
										
										</div>
									</div>
									
							
							)
						}) : (postList.map((item) => {
							return (
								
								<div className="post">


										<div className="headerPost">
											<div className="avatarSide">
												<img src={item.userProfilePic} className="avatarPic" alt = "profilePic"></img>
											</div>
											<div className="personal">
												<div className="author"> {item.authorName} </div>

												<div className="college">{item.collegeName}</div>
												<div className="time">{item.time}, {item.date}</div><br>
												</br>
											</div>
										</div>
									<div className="postContent" id = "module">
					
									<p class = "postTitle">
								    {item.title}
									</p>
									<p className="collapse" id="collapseExample" aria-expanded="false">
								
									{item.description}
									<br></br>
									<Carousel>
											<Carousel.Item>
											<img width="100%" src={item.postPicture} alt="img-post" />
											</Carousel.Item>
											<Carousel.Item>
											<img width="100%" src={item.postPicture} alt="img-post" />
											</Carousel.Item>
											<Carousel.Item>
											<img width="100%" src={item.postPicture} alt="img-post" />
											</Carousel.Item>
										</Carousel>
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
											<a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>

									</div>	
									
											
											
									

										<div className="comments">

											<br></br>
											<label>COMMENTS</label>
											<div>
												{item.comments ? (
													item.comments.map((comm) => {
														return (
															<div class = "comments">
																<div class = "comment">
																
																	<span class = "userName">{comm.username}</span> 
																	<br></br>
																	{comm.comment}
																</div>
															</div>
														)
													})
												) : (<p>No comments to display</p>)}
											</div>
											<form onSubmit={handleCommentSubmit}>
												
											
													<input name="comment" className='comment2' id="comment" type="text" placeholder="Add a comment..." />	
												
													<button onClick={() => setPostId(item.id)} class = "commentButt" type="submit"><i class="fas fa-paper-plane icons"></i></button>
												
												
													
												
													
											
												
											</form>
										</div>
									</div>
								
							)
						}))
						}
				
					{/* Rohan static copntent ends */}
					{/* Rohan code once again */}
</div>
					<div className="col-lg-4 col-md-12 col-sm-12">
						<div className="post">
						<h2>Share your experience living in the US</h2>
							<form onSubmit={handlePosts}>
								<div className='form-group'>
									<label htmlFor="title">Title</label>
									<input className='form-control' name='title' id='title' type='textarea' placeholder='Title' required />
									<br></br>

									<label for="description">Description</label>
									<textarea className='form-control' name='description' id='description' type='textarea' rows = "10" cols = "5" placeholder='Description' required />
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
									<input required type="file" accept="image/*" className="form-control-file" name="postImage" id="postImage" onChange={handleImageChange} /> <br></br>
								

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

						<div className="post">
							<h2>GLOBAL CHAT</h2>
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

