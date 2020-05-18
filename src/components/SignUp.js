import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
function SignUp() {
	const { currentUser } = useContext(AuthContext);
	const [ pwMatch, setPwMatch ] = useState('');
	const handleSignUp = async (e) => {
		e.preventDefault();
		const { firstName , lastName , email, passwordOne, passwordTwo } = e.target.elements;
		if (passwordOne.value !== passwordTwo.value) {
			setPwMatch('Passwords do not match');
			return false;
		}

		try {
			await doCreateUserWithEmailAndPassword(email.value, passwordOne.value, firstName.value , lastName.value);
		} catch (error) {
			alert(error);
		}
	};

	if (currentUser) {
		return <Redirect to='/home' />;
	}

	return (
		<div className="loginForm">
			<h1 className = "loginRegHeader">Sign up</h1>
			{pwMatch && <h4 className='error'>{pwMatch}</h4>}
			<form onSubmit={handleSignUp}>
			<div className='form-group'>
					<label htmlFor = "firstName">
						First Name
						</label>
						<input className='form-control' required name='firstName' type='text' placeholder='Tell us your first name' />
				
				</div>
				<div className='form-group'>
					<label for = "lastName">
						Last Name
						</label>
						<input className='form-control' required name='lastName' type='text' placeholder='Tell us your last name' />
					
				</div>
				<div className='form-group'>
					<label for = "email">
						Email
						</label>
						<input className='form-control' required name='email' type='email' placeholder='What is your email id?' />
				
				</div>
				<div className='form-group'>
					<label for = "passwordOne">
						Password
						</label>
						<input
							className='form-control'
							id='passwordOne'
							name='passwordOne'
							type='password'
							placeholder='Set a Password (strong one please!)'
							required
						/>
				
				</div>
				<div className='form-group'>
					<label for = "passwordTwo">
						Confirm Password
						</label>
						<input
							className='form-control'
							id = 'passwordTwo'
							name='passwordTwo'
							type='password'
							placeholder='Confirm Password (just to be sure!)'
							required
						/>
					
				</div>
				<div className = " logSignButt">
				<button id='submitButton' name='submitButton' className = "loginButt loginButt2" type='submit'>
					SIGN UP
				</button>
				</div>
			</form>
			<br />
			<SocialSignIn />
		</div>
	);
}


export default SignUp;
