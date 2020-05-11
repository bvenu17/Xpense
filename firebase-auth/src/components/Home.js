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
import { addPosts, getUser, getCollege, getAllColleges } from '../firebase/FirestoreFunctions';
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
	const [postPicUrl, setPostPicUrl] = useState();
	//loading data state
	const [loading, setLoading] = useState(true);

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
				// if (college.logo !== "") {
				// 	setCollegePic(college.logo)
				// }

				//check if user has college id, if yes get info of that college
				// let collegeDetails;
				// if (u.collegeId !== '') {
				// 	collegeDetails = await getCollege(u.collegeId);
				// 	setPostList(collegeDetails.posts);
				// 	console.log("fetched user's college info");
				// 	console.log(collegeDetails);
				// }

				setLoading(false)

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
		//get all elements from form
		let { title, expenses, description, category, collegeSelect } = event.target.elements;
		console.log("College id is the foll " + collegeSelect.value )
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

						//retrieve values from the elements and add to db
						let post = { title: title.value, authorId: currentUser.uid, collegeId: collegeSelect.value,
							expenses: expenses.value, description: description.value, category: category.value, postPicture: fireBaseUrl };
						try {
							addPosts(currentUser.uid, post);
						} catch (error) {
							alert(error);
						}
					})
			})
	};

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





				{/* <h2>This is the Home page</h2>
				YOUR DETAILS !!!
			{user ? (<p>First Name: {user.firstName}  <br />Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
				{user && user ? (<div> POSTS BY USER: {user.posts.map((item) => {
					return (<div key="1">
						<p>Post Detail: {item.title} : {item.value}</p>
						<p>Post Description: {item.description}</p>
					</div>
					)
				})}</div>) : (<p>NOT GETTING USER DATA</p>)} */}


				{/* YOUR COLLEGE DATA !!!
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
 */}

{/* 
				LIST OF COLLEGES !!!
			{collegeList && collegeList ? (<div>{collegeList.map((item) => {
					return (<div key={item.name}>
						<p>College Name: {item.name}</p>
						<p>College Logo: {item.logo === "" ? (<img src={item.logo} alt='collegepic' height="42" widht="42" />) : (<img src={collegePic} alt='defaultpic' height="42" widht="42" />)}</p>
					</div>
					)

				})}</div>) : (<p>NOT GETTING College DATA</p>)}
 */}
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

