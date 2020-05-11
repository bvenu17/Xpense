import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';

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
			<img onClick={() => socialSignOn('google')} alt='google signin' src='/imgs/btn_google_signin.png' /> <br></br>
			<img onClick={() => socialSignOn('facebook')} alt='google signin' src='/imgs/facebook_signin.png' />
		</div>
	);
};

export default SocialSignIn;