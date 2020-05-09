import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { getCollege } from '../firebase/FirestoreFunctions';


const  University = (props) => {
	const [loading, setLoading] = useState(false);
	const [collegeSelected, setCollegeSelected] = useState();

	useEffect(() => {

		async function getData() {
			try {
                console.log("enter useeffect func")
                let idValue = parseInt(props.match.params.id);
                let college = await getCollege(idValue);
                console.log(college);
				setLoading(false)
				setCollegeSelected(college);
			} catch (e) {
				console.log(e)
			}
		}
		getData();
	}, []);

	//component code
	if (!loading) {
		return (
			<div className="container">
				<h2>University Page</h2>
				<div className="profile">
                    {/* <p>{collegeSelected.name}</p> */}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p> Loading..hkhhbjgbygjv</p>
			</div>
		)
	}
}

export default University;