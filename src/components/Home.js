//basic imports
import React, { useContext, useState, useEffect } from 'react';
//css import
import '../App.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
//firebase functions import
import { AuthContext } from "../firebase/Auth";
import 'firebase/firestore';
import firebase from "firebase/app";
import "firebase/storage";
import { addPosts, getUser, getCollege, getAllColleges, getAllPosts, addCommentToPost } from '../firebase/FirestoreFunctions';
//import other components
import Chat from './Chat';


function Home() {
	//user states
	const { currentUser } = useContext(AuthContext)
	const [user, setUser] = useState();
	const [collegeList, setCollegeList] = useState();
	//post states
	const [postList, setPostList] = useState();
	const [postPic, setPostPic] = useState([]);
	const [postId, setPostId] = useState();
	//loading data state
	const [loading, setLoading] = useState(true);
	const [formSubmit, setFormSubmit] = useState(false);
	//filter posts
	const [options, setOptions] = useState();
	const [postFilter, setPostFilter] = useState();
	//state for storing multiple imgs url
	const [postImgsUrl, setPostImgsUrl] = useState([]);
	const [uploadedImgsFileName, setUploadedImgsFileName] = useState([])
	//state to show upload button
	const [uploadButton,setUploadButton] = useState(false);


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


				setLoading(false)
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, [currentUser, formSubmit])

	//onChange handler for post images
	const handleImageChange = async (event) => {
		event.preventDefault();
		const test = [];
		for (var i = 0; i < event.target.files.length; i++) {
			var imageFile = event.target.files[i];

			imageFile["id"] = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			test.push(imageFile);
		}
		setPostPic(test);
		setUploadButton(!uploadButton);


	}

	//onSubmit for uploading imgs to firebase
	const uploadMultipleImages = e => {
		e.preventDefault(); // prevent page refreshing
		const promises = [];
		postPic.forEach(file => {
			const imageName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + file.name;
			const uploadTask =
				firebase.storage().ref().child(`postImages/${imageName}`).put(file);
			promises.push(uploadTask);
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED,
				snapshot => {
					const progress =
						((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					if (snapshot.state === firebase.storage.TaskState.RUNNING) {
						console.log(`Progress: ${progress}%`);
					}
				},
				error => console.log(error.code),
				async () => {
					const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
					// do something with the url
					setPostImgsUrl(prevState => [...prevState, downloadURL]);
					setUploadedImgsFileName(prevState => [...prevState, file.name])
					setUploadButton(!uploadButton);
				}
			);
		});


	}


	//submit form for post 
	const handlePosts = async (event) => {
		event.preventDefault();
		//get all elements from form
		let { title, description, rent, groceries, transport, utilities, postImage } = event.target.elements;
		let collegeDetails = await getCollege(user.collegeId);
		//console.log("College id is the foll " + collegeSelect.value)
		//upload post image to firebase
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
			postPicture: postImgsUrl,
			date: postDate,
			time: postTime,
			rent: rent.value,
			groceries: groceries.value,
			transport: transport.value,
			utilities: utilities.value,
			userProfilePic: user.photoURL
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
		postImage.value = "";
		setPostPic([]);
		setPostImgsUrl([]);
		setUploadedImgsFileName([]);


	};


	//submit form for comments
	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		const { comment } = event.target.elements;
		console.log("post id is" + postId + " comment value is " + comment.value + user.firstName)
		try {
			//add comment to the post db
			await addCommentToPost(postId, user.firstName + " " + user.lastName, comment.value)
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

		posts_filter = posts_filter.sort((a,b) => b.createdAt - a.createdAt)

		setPostFilter(posts_filter);
	}
	//component code
	if (loading === false) {
		return (
			<div className='container container1'>
				{/* Rohan Static Content */}
				<div className="row">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-3 col-xs-3">
							<label> FILTER BY LOCATION </label>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-9 col-xs-9">
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
						{postFilter ? postFilter.map((item , i) => {
							return (

								<div className="post">
									<div className="headerPost">
										<div className="avatarSide">
											<img src={item.userProfilePic ? item.userProfilePic : '/imgs/profile.png'} className="avatarPic" alt="profilePic"></img>
										</div>
										<div className="personal">
											<div className="author"> {item.authorName} </div>

											<div className="college">{item.collegeName}</div>
											<div className="time">{item.time}, {item.date}</div><br>
											</br>
										</div>
										<div className="postContent">
											<br></br>
											<Carousel>
												{item.postPicture.map((photo,i) => {
													return (
														<Carousel.Item key={i}>
															<img key={photo} className="postImg" src={photo} alt="img-post" />
														</Carousel.Item>
													)
												})}
											</Carousel>
											<br></br>
											<p className="postTitle">
												{item.title}
											</p>
										</div>
									</div>
									<div className="postContent module" >
										<p role = "main" className="collapse" id={item.id+i+i} aria-expanded="false">

											{item.description}
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
										<a role="button" className="collapsed" data-toggle="collapse" href={'#'+item.id+i+i} aria-expanded="false" aria-controls="collapseExample">Show </a>

									</div>
									<div className="comments">

										<br></br>
										<label>COMMENTS</label>
										<div>
											{item.comments ? (
												item.comments.map((comm , i) => {
													return (
														<div key={item.id+i} className="comments">
															<div className="comment">

																<span className="userName">{comm.username}</span>
																<br></br>
																{comm.comment}
															</div>
														</div>
													)
												})
											) : (<p>No comments to display</p>)}
										</div>
										<form onSubmit={handleCommentSubmit}>

												<label htmlFor = {i}></label>
											<input name="comment" className='comment2' id = {i} type="text" placeholder="Add a comment..." />
												<label htmlFor = {item.id}></label>
											<button onClick={() => setPostId(item.id)} name = "commentButt" id = {item.id} className="commentButt" type="submit"><i className="fas fa-paper-plane icons"></i></button>

										</form>

									</div>
								</div>


							)
						}) : (postList.map((item,i) => {
							return (

								<div key={i} className="post">
									<div className="headerPost">
										<div className="avatarSide">
											<img src={item.userProfilePic ? item.userProfilePic : '/imgs/profile.png'} className="avatarPic" alt="profilePic"></img>
										</div>
										<div className="personal">
											<div className="author"> {item.authorName} </div>

											<div className="college">{item.collegeName}</div>
											<div className="time">{item.time}, {item.date}</div><br>
											</br>
										</div>
										<div className="postContent">
											<br></br>
											<Carousel>
												{item.postPicture.map((photo) => {
													return (
														<Carousel.Item key={photo}>
															<img  className="postImg" src={photo} alt="img-post" />
														</Carousel.Item>
													)
												})}
											</Carousel>
											<br></br>
											<p className="postTitle">
												{item.title}
											</p>
										</div>
									</div>
									<div className="postContent module">
										<p  role = "main" className="collapse" id={item.id+i+i} aria-expanded="false">
											{item.description}
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
										<a role="button" className="collapsed" data-toggle="collapse" href={'#'+item.id+i+i} aria-expanded="false" aria-controls="collapseExample">Show </a>

									</div>





									<div className="comments">

										<br></br>
										<label>COMMENTS</label>
										<div>
											{item.comments ? (
												item.comments.map((comm,i) => {
													return (
														<div key={item.id+i} className="comments">
															<div className="comment">

																<span className="userName">{comm.username}</span>
																<br></br>
																{comm.comment}
															</div>
														</div>
													)
												})
											) : (<p>No comments to display</p>)}
										</div>
										<form onSubmit={handleCommentSubmit}>


											<label htmlFor = {i}></label>
											<input name="comment" className='comment2' id = {i} type="text" placeholder="Add a comment..." />
												<label htmlFor = {item.id}></label>
											<button onClick={() => setPostId(item.id)} name = "commentButt" id = {item.id} className="commentButt" type="submit"><i className="fas fa-paper-plane icons"></i></button>







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
							<span className = "h2">Share your experience living in the US</span>
							<br></br>
							<form onSubmit={handlePosts}>
								<div className='form-group'>
									<label htmlFor="title">Title</label>
									{user.currentStudent ? (<input className='form-control' name='title' id='title'  placeholder='Title' required />) :
										(<input className='form-control' name='title' id='title'  placeholder='Title' disabled required />)}
									<br></br>

									<label htmlFor="description">Description</label>
									{user.currentStudent ? (<textarea className='form-control' name='description' id='description'  rows="10" cols="5" placeholder='Description' required />) :
										(<textarea className='form-control' name='description' id='description'  rows="10" cols="5" placeholder='Description' disabled required />)}
									<br></br>


									<label> Your College</label>
									{user.collegeId ? (collegeList.map((item) => {
										if (user.collegeId === item.id) {
											return (
												<p key={item.id}>{item.name}</p>
											)
										}
									})) : (<p>Please provide your college name !</p>)}

									<label htmlFor="rent">Rent</label>
									{user.currentStudent ? (<input className='form-control' name='rent' id='rent' placeholder='$' type='number' required />) :
										(<input className='form-control' name='rent' id='rent' placeholder='$' type='number' disabled required />)}
									<br></br>

									<label htmlFor="transport">Transport</label>
									{user.currentStudent ? (<input className='form-control' name='transport' id='transport' placeholder='Eg: NJ Transport, Port-Authority Bus...' type='text' required />) :
										(<input className='form-control' name='transport' id='transport' placeholder='Eg: NJ Transport, Port-Authority Bus...' type='text' disabled required />)}
									<br></br>

									<label htmlFor="utilities">Utilities</label>
									{user.currentStudent ? (<input className='form-control' name='utilities' id='utilities' placeholder='$' type='number' required />) :
										(<input className='form-control' name='utilities' id='utilities' placeholder='$' type='number' disabled required />)}
									<br></br>

									<label htmlFor="groceries">Grocery Stores</label>
									{user.currentStudent ? (<input className='form-control' name='groceries' id='groceries' placeholder='Eg: Stop-N-Shop, Shop-rite...' type='text' required />) :
										(<input className='form-control' name='groceries' id='groceries' placeholder='Eg: Stop-N-Shop, Shop-rite...' type='text' disabled required />)}
									<br></br>


									
										{uploadedImgsFileName && uploadedImgsFileName.map((item) => {
											return <p>{item}</p>
										})}
										
										<label htmlFor="postImage">Upload Media</label>
										<div className="multiImg">
										{user.currentStudent ? (
										<div><input multiple required type="file" accept="image/*" className="form-control-file" name="postImage" id="postImage" onChange={handleImageChange} /> <br></br>
																	{uploadButton ? (
																	<Button onClick={uploadMultipleImages}  className="loginButt loginButt2 profileButt"> Upload<i className="fas fa-check-circle"></i></Button>
																	): (null)}
																
																	</div>
																	) : 
																(
																<div disabled ><input multiple required type="file" accept="image/*" className="form-control-file" name="postImage" id="postImage" onChange={handleImageChange} disabled /> <br></br>
																	{uploadButton ? (
																	<Button onClick={uploadMultipleImages}  className="loginButt loginButt2 profileButt"> Upload<i className="fas fa-check-circle"></i></Button>

																	): (null)}
																	
																	</div>
																	)}
									</div>
								</div>
								
								<div className="logSignButt">
									{user.currentStudent ? (<Button variant="primary" type='submit' className="loginButt loginButt2"> POST </Button>) : (<p>You cannot Post... You have not provided your college details</p>)}
								</div>


							</form>
						</div>
						<br></br>

						<div className="post chatBox">
						<span className = "h2">GLOBAL CHAT</span>
							<br></br><br></br>
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
			<div className="container container1 ">
				<img className="loadingGIF" width="5%" src="/imgs/loading.gif" alt="img" />
			</div>
		)
	}

}

export default Home;