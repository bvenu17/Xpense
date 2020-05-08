import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';

const SignOutButton = () => {
	return (
		<div>
		<button type='button' onClick={doSignOut} href="/">
			Sign Out
		</button>
		</div>
	);
};

export default SignOutButton;
