import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import '../App.css'

const SocialSignIn = () => {
	const socialSignOn = async (provider) => {
		try {
			await doSocialSignIn(provider);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className = "ssign">
			<img className="socialSign" onClick={() => socialSignOn('google')} alt='google signin' src='/imgs/btn_google_signin.png' />
			<img className="socialSign" onClick={() => socialSignOn('facebook')} alt='google signin' src='/imgs/facebook_signin.png' />
			<img className="socialSign" onClick={() => socialSignOn('github')} alt='github signin' src='/imgs/github_signin.svg' />
		</div>
	);
};


export default SocialSignIn;
