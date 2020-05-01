import React, {useContext, useState, useEffect } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { AuthContext } from "../firebase/Auth";
import 'firebase/firestore';
import {addPosts, getUser , getAllColleges} from '../firebase/FirestoreFunctions';




function Landing() {	
	const {currentUser} = useContext(AuthContext)
	const [user, setUser] = useState();
	const [colleges, setCollege] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
		try{
			let collegeList = await getAllColleges();
			console.log(collegeList)
			let u = await getUser(currentUser.uid);
			setLoading(false)
			setUser(u);
			setCollege(collegeList)
		}catch(e){
			console.log(e)
	}
}
		getData();
	}, [currentUser])

	const handlePosts = async (event) => {
			event.preventDefault();
			let { title, value ,  description, category } = event.target.elements;
			let post ={title:title.value, authorId:currentUser.uid, value:value.value ,description:description.value, category: category.value};
	
			try {
				await addPosts(currentUser.uid, post);
			} catch (error) {
				alert(error);
			}
		};

	if(currentUser)
	{
		return <Redirect to='/home' />;
	}
	else{
			if(loading === false)
			{
			return (
				<div className='Landing'>
					<h2>This is the Landing page</h2>
					{user ? (<p>{user.firstName}  {user.lastName}</p>) : (<p>NOT GETTING USER DATA</p>)}
					{user && user ? (<p>{user.posts.map((item) => {
						return (<div>
									<p>{item.title} : {item.value}</p>
									<p>{item.description}</p>
								</div>)
					})}</p>) : (<p>NOT GETTING USER DATA</p>)}

					{colleges && colleges ? (<p>{colleges.map((item) => {
						return (<div>
									<p>{item.name}</p>
								</div>)
					})}</p>) : (<p>NOT GETTING College DATA</p>)}
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
			)}
			else{
				return(
					<div>
							<p>Loading....</p>
					</div>
					)
			}
		}
}

export default Landing;

