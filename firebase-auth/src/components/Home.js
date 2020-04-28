import React, {useContext, useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import 'firebase/firestore';
import {addPosts, getUser, getAllPosts} from '../firebase/FirestoreFunctions';




function Home() {	
	const {currentUser} = useContext(AuthContext)
	const [user, setUser] = useState();
	const [posts, setPosts] = useState();

	useEffect(() => {
		async function getData() {
		try{
			// const u = await getUser("zxFz2S5WM9QWqzkFJZVtdfux7O12");
			const u = await getUser(currentUser.uid);
			const p = await getAllPosts(currentUser.collegeId)

			setUser(u);
			setPosts(p);
		}catch(e){
			console.log(e)
	}
}
		getData();
		console.log(posts)
	}, [user, posts])
// }

	const handlePosts = async (event) => {
			event.preventDefault();
			// let { title, authorId, description, category } = event.target.elements;
			let post = event.target.elements;
	
			try {
				await addPosts(currentUser.uid, post.value);
			} catch (error) {
				alert(error);
			}
		};

	return (
		<div className='home'>
			<h2>This is the Home page</h2>
			{user ? (<p>{user.firstName}</p>) : (<p>NOT GETTING USER DATA</p>)}
			{posts ? (<p>{posts}</p>) : (<p>NOT GETTING POSTS</p>)}

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
							AuthorId:
							<input
								className='form-control'
								name='authorId'
								id='authorId'
								type='text'
								placeholder='AuthorId'
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

		</div>
	);

}

export default Home;

