import React, {useState, useEffect} from 'react';
// import * as firestore from '../firebase/FirestoreFunctions'
import '../App.css';


let collegeNames = [
	{id:1,
	name:"Princeton University",
	},
	{id:2,name:"Stevens Institute of Technology"},
	{id:3, name:"Rutgers University - New Brunswick"},
	{id:4,name:"The College of New Jersey"},
	{id:5,name:"Rutgers University - Newark"}
]





function Landing() {

	const[collegesD, setCollegesD] = useState("");
	const[collegeResult, setCollegeResult] = useState([]);

	const handleChange = event => {
		setCollegesD(event.target.value);
	  };
	 useEffect(() => {
		 function getData(){
		const results = collegeNames.filter(data =>
		  data.name.toLowerCase().includes(collegesD)
		);
		setCollegeResult(results);
		}
		getData();
	  }, [collegesD]);

	// useEffect(()=>{

	// })


	return (
		<div className="landingPage">
		 	<h2>This is the Landing page</h2>

			<input type="text" placeholder="Search" value={collegesD} onChange={handleChange} /> HERE 
			<ul>
         		{collegeResult.map(item => (
				// <li> {item} </li>
          		<li key={item.id}> <a className='unidetails' href={`/unidata/${item.id}`}> {item.name} </a> </li>
        		))}
      		</ul>
			{/* <select>
				{collegeData.map(item => (
					<option key={item.id} value={item.name}>
						{item.name}
					</option>
				))}
			</select>
			<select>
				{collegeData.map(item => (
					<option key={item.id} value={item.state}>
						{item.state}
					</option>
				))}
			</select> */}




		</div>

	);
}

export default Landing;
