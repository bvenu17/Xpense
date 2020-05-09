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
				//need to change code when college id not present
				let collegeDetails;
				if(u.collegeId!=='') {
				 collegeDetails = await getCollege(u.collegeId);
				setPostList(collegeDetails.posts);
				}
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

				<div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="post">


                            <h2>Share your experience living in the US</h2>
                            <form onSubmit={handlePosts}>
                                <div className='form-group'>
                                    <label for="title">
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
                                    <label for="poost-image">Upload Media</label>
                                    <input required type="file" id="post-image" onChange={handleImageChange} /> <br></br>

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
                                <div class="logSignButt">
                                    <Button variant="primary" type='submit' className="loginButt loginButt2"> POST </Button>
                                </div>
                            </form>
                        </div>
                        <br></br>
                        <br></br>
                        <div class="post">
                            <h1>CHAT COMES HERE</h1>
                        </div>
                    </div>
					</div>
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

