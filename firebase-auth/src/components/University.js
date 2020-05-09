import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { getCollege } from '../firebase/FirestoreFunctions';


function University(props) {
	const [loading, setLoading] = useState(true);
	const [collegeSelected, setCollegeSelected] = useState();

	useEffect(() => {

		async function getData() {
			try {
				console.log("enter useeffect func")
                let college = await getCollege(props.match.params.id);
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
                    <p>{collegeSelected.name}</p>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<p> Loading...</p>
			</div>
		)
	}
}

export default University;
