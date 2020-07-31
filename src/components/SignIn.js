import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { doSignInWithEmailAndPassword, doPasswordReset } from '../firebase/FirebaseFunctions';

function SignIn() {
	const { currentUser } = useContext(AuthContext);
	const handleLogin = async (event) => {
		event.preventDefault();
		let { email, password } = event.target.elements;

		try {
			await doSignInWithEmailAndPassword(email.value, password.value);
		} catch (error) {
			alert(error);
		}
	};

	const passwordReset = (event) => {
		event.preventDefault();
		let email = document.getElementById('email').value;
		if (email) {
			doPasswordReset(email);
			alert('Password reset email was sent');
		} else {
			alert('Please enter an email address below before you click the forgot password link');
		}
	};
	if (currentUser) {
		return <Redirect to='/home' />;
	}
	return (
		<div className="loginForm">
			<h1 className = "loginRegHeader">Log in</h1>
			<form onSubmit={handleLogin}>
			<div className='form-group'>
					<label htmlFor="email">
						Email
						</label>
						<input
							className='form-control inp'
							name='email'
							id='email'
							type='email'
							placeholder='Email'
							required
						/>
					
				</div>
				<div className='form-group'>
					<label htmlFor = "password">
						Password
						</label>
						<input
							className='form-control'
							name='password'
							id = "password"
							type='password'
							placeholder='Password'
							required
						/>
						<button className='forgotPassword' onClick={passwordReset}>
					Forgot Password?
				</button>
					
				</div>
				<div className = " logSignButt">
				<button type='submit' className = "loginButt loginButt2">LOGIN</button>	
				</div>
				
			</form>

			<br />
			<SocialSignIn />
		</div>
	);
}

export default SignIn;
