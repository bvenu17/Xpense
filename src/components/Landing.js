import React, {useContext , useState, useEffect } from 'react';
import '../App.css';
import { AuthContext } from "../firebase/Auth";
import { Redirect } from 'react-router-dom';
import 'firebase/firestore';
import { getAllColleges , getAllPosts} from '../firebase/FirestoreFunctions';




function Landing() {
	const {currentUser} = useContext(AuthContext)
	const [colleges, setCollege] = useState();
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

			<div>

			<h1>All Posts</h1>

			{postList && postList.map((item) => {
				return (
					<div className="postContent" style={{ border: '3px solid black', margin: '30px' }}>

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
					</div>
	)
})}
{/* testing ends */}
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

