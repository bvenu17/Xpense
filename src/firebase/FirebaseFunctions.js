import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseApp from './Firebase'

let db  = firebaseApp.firestore();

async function doCreateUserWithEmailAndPassword(email, password, firstName , lastName) {
	await firebase.auth().createUserWithEmailAndPassword(email, password)
	var user = firebase.auth().currentUser;
	let data = {
		firstName: firstName,
		lastName : lastName,
		email : email,
		dob : new Date(),
		flag : false,
		collegeId : '',
		currentStudent : '',
		photoURL : '',
		posts : []
	  };
	  let setDoc = await db.collection('users').doc(user.uid).set(data);
	 	
	  console.log(setDoc)	  
	 // console.log(postDoc)	  

	firebase.auth().currentUser.updateProfile({ displayName: String(firstName)+" "+String(lastName) });
}


async function doChangePassword(email, oldPassword, newPassword) {
	let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
	await firebase.auth().currentUser.reauthenticateWithCredential(credential);
	await firebase.auth().currentUser.updatePassword(newPassword);
	await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
	await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
	let socialProvider = null;
	if (provider === 'google') {
		socialProvider = new firebase.auth.GoogleAuthProvider()
	} else if (provider === 'facebook') {
		socialProvider = new firebase.auth.FacebookAuthProvider();
	}
	else if (provider === 'github') {
		socialProvider = new firebase.auth.GithubAuthProvider();
	}
	await firebase.auth().signInWithPopup(socialProvider).then(function(result) {
		console.log(result)
		const displayName = result.user.displayName.split(" ")
		if(result.additionalUserInfo.isNewUser) {
		let data = {
			firstName: displayName[0],
			lastName : displayName[1],
			email : result.user.email,
			dob : new Date(),
			flag : false,
			collegeId : '',
			status : '',
			photoURL : '',
			posts : []
		  };
		   db.collection('users').doc(result.user.uid).set(data);	
		

		}
	  }).catch(function(error) {

		console.log(error.message)
	  });
}

async function doPasswordReset(email) {
	await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
	await firebase.auth().updatePassword(password);
}

async function doSignOut() {
	await firebase.auth().signOut();
}

export {
	doCreateUserWithEmailAndPassword,
	doSocialSignIn,
	doSignInWithEmailAndPassword,
	doPasswordReset,
	doPasswordUpdate,
	doSignOut,
	doChangePassword
};
