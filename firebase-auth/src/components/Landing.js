import React, {useContext , useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import { Redirect } from 'react-router-dom';
import 'firebase/firestore';
import { getAllColleges , getAllPosts} from '../firebase/FirestoreFunctions';




function Landing() {
	const {currentUser} = useContext(AuthContext)
	const [colleges, setCollege] = useState();
	const [allPosts, setallPosts] = useState();
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

				<div class = "container">
					<h2>This is the Landing page</h2>
					<p>COLLEGES: </p>
					{colleges && colleges ? (<p>{colleges.map((item) => {
						return (<div>
									<p>{item.name}</p>
								</div>)
					})}</p>) : (<p>NOT GETTING College DATA</p>)}
					
					<p>POSTS: </p>
					{allPosts && allPosts ? (<p>{allPosts.map((item) => {
						return (<div>
									<p>{item.category} <br></br></p>
								</div>)
					})}</p>) : (<p>NOT GETTING Post DATA</p>)}
					<p> Login to post anything</p>
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

