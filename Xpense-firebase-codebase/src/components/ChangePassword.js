import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';

function ChangePassword() {
	const { currentUser } = useContext(AuthContext);
	const [ pwMatch, setPwMatch ] = useState('');
	console.log(currentUser);

	const submitForm = async (event) => {
		event.preventDefault();
		const { currentPassword, newPasswordOne, newPasswordTwo } = event.target.elements;

		if (newPasswordOne.value !== newPasswordTwo.value) {
			setPwMatch('New Passwords do not match, please try again');
			return false;
		}

		try {
			await doChangePassword(currentUser.email, currentPassword.value, newPasswordOne.value);
			alert('Password has been changed, you will now be logged out');
		} catch (error) {
			alert(error);
		}
	};
	if (currentUser.providerData[0].providerId === 'password') {
		return (
			<div>
				{pwMatch && <h4 className='error'>{pwMatch}</h4>}
				<br></br>
				<h2>Change Password</h2>
				<form onSubmit={submitForm}>
					<div className='form-group'>
						<label for = "currentPassword">
							Current Password
							</label>
							<input
								className='form-control'
								name='currentPassword'
								id='currentPassword'
								type='password'
								placeholder='Current Password'
								required
							/>
						
					</div>

					<div className='form-group'>
						<label for = "newPasswordOne">
							New Password
							</label>
							<input
								className='form-control'
								name='newPasswordOne'
								id='newPasswordOne'
								type='password'
								placeholder='Password'
								required
							/>
					
					</div>
					<div className='form-group'>
						<label for = "newPasswordTwo">
							Confirm New Password
							</label>
							<input
								className='form-control'
								name='newPasswordTwo'
								id='newPasswordTwo'
								type='password'
								placeholder='Confirm Password'
								required
							/>
					
					</div>

					<Button type='submit' className = "loginButt loginButt2">Change Password</Button>
				</form>
				<br />
			</div>
		);
	} else {
		return (
			<div>
				<h2>You are signed in using a Social Media Provider, You cannot change your password</h2>
			</div>
		);
	}
}

export default ChangePassword;
