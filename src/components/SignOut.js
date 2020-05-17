import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import {Button} from 'react-bootstrap'

const SignOutButton = () => {
	return (
		<Button variant="primary" className = "loginButt" onClick={doSignOut}>
			<i className="fas fa-sign-out-alt"></i> Sign Out
		</Button>
	);
};


export default SignOutButton;
