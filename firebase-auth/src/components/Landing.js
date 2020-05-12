import React, {useContext , useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import { Redirect } from 'react-router-dom';
import 'firebase/firestore';
import {Button} from 'react-bootstrap'
import { getAllColleges , getAllPosts} from '../firebase/FirestoreFunctions';




function Landing() {
	const {currentUser} = useContext(AuthContext)
	const [collegeList, setCollege] = useState();
	const [postList, setallPosts] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
		try{
			let collegeList = await getAllColleges();
			console.log(collegeList)
			let allPost = await getAllPosts()
			setLoading(false)
			setCollege(collegeList)
			setallPosts(allPost)
		}catch(e){
			console.log(e)
	}
}
		getData();
	}, [])


	if(currentUser)
	{
		return <Redirect to='/home' />;
	}
	else{
			if(loading === false)
			{
				return (
					<div className='container container1'>
						{/* Rohan Static Content */}
						<div className="row">
							<div className="col-lg-8 col-md-12 col-sm-12">
									{postList && postList.map((item) => {
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
														Category : {item.category}
													<br></br>
														Expense : ${item.expenses}
													<br></br>
													<img width="100px" src={item.postPicture} alt="img-post" />
												</p>
												
												<div className="comments">
		
										<br></br>
										<h2>COMMENTS GO HERE</h2>
										<form>
											<input name="comment" id="comment" type="text" placeholder="Login to comment" />
										</form>
									</div>
									</div>
									</div>
									)
								})}
							</div>
							{/* Rohan static copntent ends */}
							{/* Rohan code once again */}
		
							<div className="col-lg-4 col-md-12 col-sm-12">
							<div className="post">
							<h2>Share your experience living in the US</h2>

							{/* Currently this form is disabled */}


							<form>
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
									<input required type="file" id="post-image"/> <br></br>

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
									<Button variant="primary" type='submit' className="loginButt loginButt2" disabled> POST </Button>


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
					</div>
		
				)
}

else {
	return (
		<div className="container container1">
			<p>Loading....</p>
		</div>
	)
}

}
}


export default Landing;

