import React, {useContext, useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import 'firebase/firestore';
import {addPosts, getUser , getCollege, getAllColleges} from '../firebase/FirestoreFunctions';



function Home() {	
	const {currentUser} = useContext(AuthContext)
	const [user, setUser] = useState();
	const [college, setCollege] = useState();
	const [collegeList, setCollegeList] = useState();
	const [postList, setPostList] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
		try{
			let collegeList = await getAllColleges();
			setCollegeList(collegeList)
			let u = await getUser(currentUser.uid);
			let collegeDetails = await getCollege(u.collegeId);
			setPostList(collegeDetails.posts);
			setLoading(false)
			setUser(u);
			setCollege(collegeDetails)
		}catch(e){
			console.log(e)
	}
}
		getData();
	}, [currentUser])

	const handlePosts = async (event) => {
			// event.preventDefault();
			let { title, value ,  description, category } = event.target.elements;
			let post ={title:title.value, authorId:currentUser.uid, value:value.value ,description:description.value, category: category.value};
	
			try {
				await addPosts(currentUser.uid, post);
			} catch (error) {
				alert(error);
			}
		};
	if(loading === false)
	{
	return (
		<div className='home'>
			<h2>This is the Home page</h2>
			YOUR DETAILS !!!
			{user ? (<p>First Name: {user.firstName}  <br/>Last Name: {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
			{user && user ? (<div> POSTS BY USER: {user.posts.map((item) => {
				return (<div key="1">
							<p>Post Detail: {item.title} : {item.value}</p>
							<p>Post Description: {item.description}</p>
						</div>
						)
			})}</div>) : (<p>NOT GETTING USER DATA</p>)}


			YOUR COLLEGE DATA !!!
			{ college && college ? (<div>
									<p>Logo: {college.logo}</p>
									<p>Name: {college.name}</p>
									<p>City: {college.city}</p>
									<p>Average Expenses: {college.avgExpense}</p>
									<div>POSTS ABOUT COLLEGE: {postList ? postList.map((post) => {
								return (<div key="1">
											<p>Post Title: {post.Title}</p>
											<p>Post Category: {post.Category}</p>
											<p>Post Description: {post.Description}</p>
										</div>
										)}) : (<p>NO POSTS</p>)
										}
										</div>

								</div>) : null } 



			LIST OF COLLEGES !!!
			{collegeList && collegeList ? (<div>{collegeList.map((item) => {
				return (<div key={item.name}>
							<p>College Name: {item.name}</p>
							<p>College Logo: {item.logo}</p>
						</div>
						)
					
			})}</div>) : (<p>NOT GETTING College DATA</p>)}



			<p> ADD YOUR POSTS BELOW </p>
			<form onSubmit={handlePosts}>
					<div className='form-group'>
						<label>
							Title:
							<input
								className='form-control'
								name='title'
								id='title'
								type='text'
								placeholder='Title'
								required
								/>
						</label>
						<label>
							Value:
							<input
								className='form-control'
								name='value'
								id='value'
								type='textarea'
								placeholder='Value'
								required
							/>
						</label>
						<label>
							Description:
							<input
								className='form-control'
								name='description'
								id='description'
								type='textarea'
								placeholder='Description'
								required
							/>
						</label>
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
					<button type='submit'> Post </button>
				</form> 
				{/* <select id='college' name='college'>
						{colleges.map(item => (
							<option key={item.uid} value={item.name}>
								{item.name}
							</option>
						))}	
						</select> */}

		</div>
	) }
	else{
		return(
            <div>
                    <p>Loading....</p>
            </div>
            )
	}

}

export default Home;

