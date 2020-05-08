import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseApp from './Firebase'

let db = firebaseApp.firestore();

// async function updateUser(userObject) {
//     await db.collection('users').doc(uid).set(userObject)
// };

async function addPosts(uid, postObject) {
    
  await db.collection('posts').doc(uid).update({
    userPosts:firebase.firestore.FieldValue.arrayUnion(postObject)
  });
  await db.collection('users').doc(uid).update({
    posts: firebase.firestore.FieldValue.arrayUnion(postObject)
  });
};

// async function deletePosts(userObject) {
//     const removeObj = db.collection('posts').doc(uid).delete()
//     await db.collection('users').doc(uid).update({
//         // posts : firebase.firestore.FieldValue.arrayUnion(postObject)
//         posts : firebase.firestore.FieldValue.arrayUnion(userObject)
//     });
// };


async function getUser(uid) {
  let userRef = await db.collection('users').doc(uid);
  let getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        //console.log('Document data:', doc.data());
        console.log("Inside firestore functions: ", doc.data())
        return doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  return getDoc
};

//function to add/update profile pic of the user
async function updateProfilePic(uid, imageUrl) {
  // let userRef = await db.collection('users').doc(uid);
  console.log('enter update profile pic');
  let updatePic = await db.collection("users").doc(uid).update({
    "photoURL": imageUrl,
  })
    .then(function () {
      console.log("profile pic was updated!");
    });
}

//function to update account details of the user
async function updateAccountInfo(uid, firstName, lastName, dateOfBirth) {
  // let userRef = await db.collection('users').doc(uid);
  console.log('enter update account info ');
  let updateInfo = await db.collection("users").doc(uid).update({
    "firstName": firstName,
    "lastName": lastName,
    "dob": dateOfBirth
  })
    .then(function () {
      console.log("account info was updated!");
    });
}
async function getPost(uid) {
  let postRef = await db.collection('posts').doc(uid);
  let getDoc = postRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        return doc.data()
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  return getDoc
};


async function getAllPostsforCollege(collegeID) {
  let postsRef = db.collection('posts');
  let allPosts = []
  let query = postsRef.where('collegeID', '==', collegeID).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        allPosts.add(doc.data())
      });
      return allPosts
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  return query;
};

async function getAllPosts() {
  const snapshot = await firebase.firestore().collection('posts').get()
  return snapshot.docs.map(doc => doc.data());
};

async function getAllColleges() {
  const snapshot = await firebase.firestore().collection('colleges').get()
  return snapshot.docs.map(doc => doc.data());
};

async function getCollege(uid) {
  let collegeRef = await db.collection('colleges').doc(uid);
  let getDoc = collegeRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        return doc.data()
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  return getDoc
};

export {
  // updateUser,
  addPosts,
  getAllColleges,
  getCollege,
  // deletePosts,
  getAllPosts,
  getAllPostsforCollege,
  getUser,
  getPost,
  updateProfilePic,
  updateAccountInfo
};


