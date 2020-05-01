import React from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';

function Profile() {
	return (
		<div>
			<h2>Profile Page</h2>
			<ChangePassword />
			<SignOutButton />
		</div>
	);
}

export default Profile;
