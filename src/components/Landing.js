import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import { Redirect } from 'react-router-dom';
import 'firebase/firestore';
import { Button, Modal } from 'react-bootstrap'
import { getAllColleges, getAllPosts } from '../firebase/FirestoreFunctions';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';
import Carousel from 'react-bootstrap/Carousel'
function Landing() {
	const { currentUser } = useContext(AuthContext)
	const [collegeList, setCollege] = useState();
	const [postList, setallPosts] = useState();
	const [loading, setLoading] = useState(true);


	//login to post
	const [logSign, setlogSign] = useState("Signup");
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const setLogin = () => setlogSign("Login")
	const setSignup = () => setlogSign("SignUp")

	//filter for dropdown
	const [options, setOptions] = useState();
	const [postFilter, setPostFilter] = useState();

	useEffect(() => {
		let optionFilter = new Set();
		async function getData() {
			try {
				let collegeList = await getAllColleges();
				console.log(collegeList)
				let allPost = await getAllPosts()
				setCollege(collegeList)
				setallPosts(allPost)

				//filter for dropdown
				collegeList.forEach((college) => {
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
	}, [])


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


	if (currentUser) {
		return <Redirect to='/home' />;
	}
	else {
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
						<div className="col-lg-8 col-md-12 col-sm-12">

							{postFilter ? postFilter.map((item) => {
								return (
									<div className="post">
											<div className="headerPost">
											<div className="avatarSide">
												<img src={item.userProfilePic?item.userProfilePic:'/imgs/profile.png'}  className="avatarPic" alt = "profilePic"></img>
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
												return(
													<Carousel.Item>
													<img key={photo} className="postImg" src={photo} alt="img-post" />
													</Carousel.Item>
												)
												})}
											</Carousel>
											<br></br>
											<p class="postTitle">
												{item.title}
											</p>
										</div>
										</div>
									<div className="postContent" id = "module">

									<p className="collapse" id="collapseExample" aria-expanded="false">
								
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
												{/* <p>You need to Login to Comment</p> */}
												<form>
													<input name="comment" className='comment2' id="comment" type="text" placeholder="Add a comment..." onClick={handleShow} />
													<button class="commentButt" type="submit"><i class="fas fa-paper-plane icons" onClick={handleShow} ></i></button>
													<Modal className="loginForm" show={show} onHide={handleClose} >
														<div className = "modalContent">
															<h3> Please Provide College Details To Post !</h3>
														</div>
													</Modal>
												</form>
											</div>
										</div>
									
								)
							}) : (postList.map((item) => {
								return (
									<div className="post">
									<div className="headerPost">
									<div className="avatarSide">
										<img src={item.userProfilePic?item.userProfilePic:'/imgs/profile.png'}  className="avatarPic" alt = "profilePic"></img>
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
												return(
													<Carousel.Item>
													<img key={photo} className="postImg" src={photo} alt="img-post" />
													</Carousel.Item>
												)
												})}
											</Carousel>
											<br></br>
											<p class="postTitle">
												{item.title}
											</p>
										</div>
								</div>
							<div className="postContent" id = "module">
							<p className="collapse" id="collapseExample" aria-expanded="false">
						
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
										) : (<div class = "comments">No comments to display</div>)}
									</div>
										{/* <p>You need to Login to Comment</p> */}
										<form>
										<input name="comment" className='comment2' id="comment" type="text" placeholder="Add a comment..." onClick={handleShow} />
										<button class="commentButt" type="submit"><i class="fas fa-paper-plane icons" onClick={handleShow}></i></button>
											<Modal className="loginForm" show={show} onHide={handleClose} >
													<div className = "modalContent">
														<h3> Please Provide College Details To Post !</h3>
													</div>
											</Modal>
											
											
										</form>
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
								<h2>Share your experience living in the US</h2>

								{/* Currently this form is disabled */}


								<form>
									<div className='form-group' onClick={handleShow}>

										<Modal className="loginForm" show={show} onHide={handleClose} >

											<div className="modalContent">
												{logSign === "Login" ? <SignUp></SignUp> : <SignIn></SignIn>}
											</div>
											<Button variant="primary" className="modalHeader" onClick={logSign === "Login" ? setSignup : setLogin}>
												{logSign === "Login" ? "Have an account? Login here" : "Don't have an account? Signup Now"}
											</Button>
										</Modal>




										<label htmlFor="title">Title</label>
										{show ? (<input className='form-control' name='title' id='title' type='textarea' placeholder='Title' disabled required />) :
												(<input className='form-control' name='title' id='title' type='textarea' placeholder='Title' required />)}
										<br></br>

										<label for="description">Description</label>
										{show ? (<input className='form-control' name='description' id='description' type='textarea' placeholder='Description' disabled required />) :
												(<input className='form-control' name='description' id='description' type='textarea' placeholder='Description' required />)}
										<br></br>

										<label for="rent">Rent</label>
										{show ? (<input className='form-control' name='rent' id='rent' placeholder='$' disabled required />) :
												(<input className='form-control' name='rent' id='rent' placeholder='$' required />)}
										<br></br>

										<label for="transport">Transport</label>
										{show ? (<input className='form-control' name='transport' id='transport' placeholder='Eg: NJ Transport, Port-Authority Bus...' disabled required />) :
												(<input className='form-control' name='transport' id='transport' placeholder='Eg: NJ Transport, Port-Authority Bus...' required />)}
										<br></br>

										<label for="house">Houses</label>
										{show ? (<input className='form-control' name='house' id='house' placeholder='Eg: 2BHK with utilitites, 3BHK only females...' disabled required />) :
												(<input className='form-control' name='house' id='house' placeholder='Eg: 2BHK with utilitites, 3BHK only females...' required />)}
										<br></br>

										<label for="groceries">Groceries</label>
										{show ? (<input className='form-control' name='groceries' id='groceries' placeholder='Eg: Stop-N-Shop, Shop-rite...' disabled required />) : 
												(<input className='form-control' name='groceries' id='groceries' placeholder='Eg: Stop-N-Shop, Shop-rite...' required />)}
										<br></br>

										<label for="post-image">Upload Pictures</label>
										{show ? (<div><input required type="file" id="post-image" disabled /> <br></br></div>) : 
												(<div><input required type="file" id="post-image" /> <br></br></div>) }
										


									</div>
									<div className="logSignButt">
										{/* <Button variant="primary" type='submit' className="loginButt loginButt2" disabled> POST </Button> */}
										<Button variant="primary" className="loginButt loginButt2" onClick={handleShow}>
											POST
										</Button>

										<Modal className="loginForm" show={show} onHide={handleClose} >

											<div className="modalContent">
												{logSign === "Login" ? <SignUp></SignUp> : <SignIn></SignIn>}
											</div>
											<Button variant="primary" className="modalHeader" onClick={logSign === "Login" ? setSignup : setLogin}>
												{logSign === "Login" ? "Have an account? Login here" : "Don't have an account? Signup Now"}
											</Button>
										</Modal>


									</div>
								</form>
							</div>
							<br></br>
							<br></br>
							<div className="post">
								<h2>GLOBAL CHAT</h2>
								<Chat />
							</div>
						</div>
					</div>
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
}


export default Landing;

