//basic imports
import React, { useEffect, useContext, useState } from 'react';
//cloud storage imports
import firebase from "firebase/app";
import "firebase/storage";
//other components import
import SignOutButton from './SignOut';
import ChangePassword from './ChangePassword';
//databse functions import
import { AuthContext } from "../firebase/Auth";
import { getUser, getUserPosts, updateProfilePic, updateAccountInfo, getAllColleges } from '../firebase/FirestoreFunctions';
//css import
import '../App.css';
import Button from 'react-bootstrap/Button';
//datepicker imports
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
//import for toggle button
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
//import for dropdown material ui
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormLabel } from 'react-bootstrap';
//static file init
const defpic = require('../assets/default-avatar.png')

function Profile() {
	//user states
	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState();
	//loading state
	const [loading, setLoading] = useState(true);
	const [temp, setTemp] = useState(false);
	//database states
	const [change, setChange] = useState(false);
	const [profPic, setProfPic] = useState();
	const [profPicUrl, setProfPicUrl] = useState();
	const [formSubmit, setFormSubmit] = useState(false);
	const [dob, setDob] = useState();
	const [currentStudent, setCurrentStudent] = useState(false);
	//college states
	const [collegeList, setCollegeList] = useState();
	const [collegeSelected, setCollegeSelected] = useState();
	//user posts state
	const [userPosts, setUserPosts] = useState();

	//lifecycle method
	useEffect(() => {
		async function getData() {
			try {
				console.log("enter use effect func")
				//fetch user details from db
				let u = await getUser(currentUser.uid);
				setLoading(false)
				setUser(u);
				setCurrentStudent(u.currentStudent)
				console.log("fetched user details", u)
				// fetch college list from db
				let allColleges = await getAllColleges();
				setCollegeList(allColleges);
				console.log('fetched college list', allColleges);
				//fetch user posts from db
				let allPostsOfUser = await getUserPosts(currentUser.uid);
				setUserPosts(allPostsOfUser);
				console.log("fetched user posts from db", allPostsOfUser)
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, [currentUser, profPicUrl, formSubmit]);

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
		const storage = firebase.storage();
		const uploadTask = storage.ref(`/profilePics/${profPic.name}`).put(profPic);
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
				storage.ref('profilePics').child(profPic.name).getDownloadURL()
					.then(fireBaseUrl => {
						//setProfPicUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
						setProfPicUrl(fireBaseUrl);
						try {
							updateProfilePic(currentUser.uid, fireBaseUrl);
						} catch (error) {
							alert(error);
						}
						console.log('firebase url is' + fireBaseUrl);
					})
			})
	}

	//change handler for form input
	const handleDateChange = async (date) => {
		//event.preventDefault();
		setDob(date);

	}
	//change handler for toggle button
	const handleToggleChange = async (event) => {
		setCurrentStudent(!currentStudent);
	}
	//change handler for college list dropdown  button
	const handleDropdownChange = async (event) => {
		setCollegeSelected(event.target.value);
	}

	//function to update account details of the user
	const handleAccountUpdate = async (event) => {
		event.preventDefault();
		console.log('entering update acc func');
		let { firstName, lastName, dob, collegeSelect } = event.target.elements;
		const first = firstName.value;
		const last = lastName.value;
		const dateOfBirth = dob.value;
		let selectedCollegeId;
		if (!currentStudent) {
			selectedCollegeId = '';
		} else {
			selectedCollegeId = collegeSelect.value
		}
		let status = currentStudent;
		console.log("form data " + first + "  " + last + dateOfBirth + " " + selectedCollegeId + status);
		if (first && last && dateOfBirth) {
			try {
				await updateAccountInfo(currentUser.uid, first, last, dateOfBirth, selectedCollegeId, status);
				setFormSubmit(true);
			} catch (error) {
				alert(error);
			}
		} else alert('enter all info');
	};

	//component code
	if (!loading) {
		return (
			<div className="container container1">
				{/* Profile picture part */}
				<div className="col-lg-12 col-md-12 col-sm-12">
					<h2>Profile Page</h2>
					<div className="post">
						<div className="text-center">

							{user && user.photoURL ? (<img className="align-self-center" c src={user.photoURL} alt='profilePic' style={{ borderRadius: "50%" }} height="200" width="200" />) : (<p>Default Picture<br /><img src={defpic} alt='defaultpic' height="100" width="100" /></p>)}

							{/* form to chang profile pic */}

							<form onSubmit={handleUpload}>
								{/* <label for="profilepicfile">upload file in .jpeg or .png format</label> */}
								<input type='file' name="porfilepicfile" id="porfilepicfile" onChange={handleChange} />
								<br></br><br></br>
								<button style={{ border: '3px solid black' }}>Change profile picture</button>
							</form>
							{/* display user details from db */}
							{user ? (<p>First Name: {user.firstName}  <br />Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}

						</div>
					</div>
				</div>
				{/* form to update account details */}
				<h2>Edit account info</h2>

				{temp ? (
					<div>
						{/* account form starts here */}
						<form id="accountInfoForm" name="accountInfoForm" onSubmit={handleAccountUpdate}>
							<label for="firstName">First Name:</label>
							<input required type="text" id="firstName" value={user.firstName} name="firstName" placeholder="Enter your first name" />
							<br></br>
							<label for="lastName">Last Name:</label>
							<input required type="text" value={user.lastName} id="lastName" name="lastName" placeholder="Enter your last name" />
							<br>
							</br>
							{/* material ui date picker for dob */}
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container justify="center">
									<KeyboardDatePicker
										margin="normal"
										id="dob"
										name="dob"
										label="Enter date of birth"
										format="MM/dd/yyyy"
										value={dob}
										required
										onChange={handleDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
							{/*input field for college name if user is a current student */}
							{currentStudent ? (
								<div>
									<FormControl component="fieldset">
										<FormLabel component="legend">Are you a current student</FormLabel>

										<FormGroup row>
											<FormControlLabel
												control={<Switch checked={currentStudent} onChange={handleToggleChange} name="yes" />}
												label="Yes" labelPlacement="end"
											/>
										</FormGroup>
									</FormControl>
									<br></br>
									<select
										className='text-center '
										name='collegeSelect'
										id='collegeSelect'>
										{collegeList && collegeList.map((item) => {
											return (
												<option selected={item.id == user.collegeId ? (true) : (false)} value={item.id}>{item.name}</option>

											)
										})}

									</select>
								</div>
							) : (
									<FormControl component="fieldset">
										<FormLabel component="legend">Are you a current student</FormLabel>

										<FormGroup row>
											<FormControlLabel
												control={<Switch checked={currentStudent} onChange={handleToggleChange} name="yes" />}
												label="Yes" labelPlacement="end"
											/>
										</FormGroup>
									</FormControl>)}
							<br></br>
							<br></br>
							<button type='submit'>Apply changes</button>
						</form>
						<br></br><br></br>

						<Button variant="primary" onClick={() => setTemp(!temp)} type='submit' className="loginButt loginButt2"> Cancel </Button>

					</div>

				) : (
						<div>
							<br></br>

							<Button variant="primary" onClick={() => setTemp(!temp)} type='submit' className="loginButt loginButt2"> Edit Profile </Button>
						</div>
					)
				}

				{/* Get user posts */}
				<h1>My posts</h1>
				{userPosts && userPosts.map((item) => {
					return (
						<div className="post">
							<div className="postContent">
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
													Expense : ${item.expenses}
									<br></br>
									<img width="100px" src={item.postPicture} alt="img-post" />
									<br></br>
									<i className="fas fa-shopping-cart icons" title="groceries"></i>${item.groceries} per month  GROCERIES

                                    <br></br>
									<i className="fas fa-home icons" title="rent"></i>${item.rent} per month RENT
                                    <br></br>
									<i className="fas fa-wifi icons" title="internet"></i>${item.wifi} per month WIFI
                                    <br></br>
									<i className="fas fa-bolt icons" title="electricity"></i>${item.electricity} per month ELECTRICITY
                                    <br></br>
									<i className="fas fa-subway icons" title="transport"></i>${item.transport} per month TRANSPORT
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
								</div>
							</div>
						</div>

					)
				}
				)}
					<br></br>
				{/* change password part */}
				{change ? <div><ChangePassword /> <button onClick={() => setChange(!change)}>Hide</button></div> : <button onClick={() => setChange(!change)}>Click to Change Password</button>} <br />
				<br></br>
				<SignOutButton />
			</div>
		);
	} else {
		return (
			<div>
				<p>Profile Loading...</p>
			</div>
		)
	}
}

export default Profile;
