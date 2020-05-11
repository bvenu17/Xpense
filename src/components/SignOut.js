import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import {Button, Modal} from 'react-bootstrap'

const SignOutButton = () => {
	return (
		<Button variant="primary" className = "loginButt" onClick={doSignOut}>
			Sign Out
		</Button>
	);
};


export default SignOutButton;
