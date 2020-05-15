import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseApp from './Firebase'

let db = firebaseApp.firestore();

async function addPosts(uid, postObject) {
  //func to add post to db
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
postObject.createdAt=timestamp();
  await db.collection("posts").add(postObject)
    .then(function (docRef) {
      postObject.postId = docRef.id;
      console.log("Post written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  console.log('post object which needs to be added to the user collection is');
  console.log(postObject);
  //func to add the post to user db
  await db.collection('users').doc(uid).update({
    posts: firebase.firestore.FieldValue.arrayUnion({postId:postObject.postId})
  })
    .then(function () {
      console.log("Post in User Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};

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
async function updateAccountInfo(uid, firstName, lastName, dateOfBirth, selectedCollegeId, status) {

  // let userRef = await db.collection('users').doc(uid);
  console.log('enter update account info ');
  let updateInfo = await db.collection("users").doc(uid).update({
    "firstName": firstName,
    "lastName": lastName,
    "dob": dateOfBirth,
    "collegeId": selectedCollegeId,
    "currentStudent": status

  })
    .then(function () {
      console.log("account info was updated!");
    });
}
// async function getPost(uid) {
//   let postRef = await db.collection('posts').doc(uid);
//   let getDoc = postRef.get()
//     .then(doc => {
//       if (!doc.exists) {
//         console.log('No such document!');
//       } else {
//         return doc.data()
//       }
//     })
//     .catch(err => {
//       console.log('Error getting document', err);
//     });
//   return getDoc
// };


async function getAllPostsforCollege(collegeID) {
  let postsRef = db.collection('posts');
  let allPosts = [];
  let x;
  let query = postsRef.where('collegeId', '==', collegeID).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        x=doc.data();
        x.id=doc.id;
        allPosts.push(x)
      });
      return allPosts
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  return query;
};

//gets all the post from db with  docId
async function getAllPosts() {
  // const snapshot = await firebase.firestore().collection('posts').get()
  // return snapshot.docs.map(doc => doc.data());
  const markers = [];
  let x;
  await firebase.firestore().collection('posts').orderBy("createdAt","desc").get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        x = doc.data();
        x.id = doc.id;
        markers.push(x);
      });
    });
  return markers;
};

async function getUserPosts(uid) {
  let postsRef = db.collection('posts');
  let allPosts = [];
  let x;
  let query = postsRef.where('authorId', '==', uid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        x=doc.data();
        x.id=doc.id;
        allPosts.push(x)
      });
      return allPosts
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  return query;
};

async function getAllColleges() {
  console.log("getting all colleges");
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

async function addCollege(element) {
  await db.collection('colleges').add(element);
};


//func to add commments for the post to db
async function addCommentToPost(postId, userName, commentText) {
  await db.collection('posts').doc(postId).update({
    comments: firebase.firestore.FieldValue.arrayUnion({ username: userName, comment: commentText })
  })
    .then(function () {
      console.log("Comment in Post Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

};

//harish add messages to chat db
async function addChat(chatObject) {
  //func to add post to db
 // let chatData = { name: userName, message: chatObject }
 const timestamp = firebase.firestore.FieldValue.serverTimestamp;
 chatObject.createdAt=timestamp();
  await db.collection("chats").add(chatObject)
    .then(function (docRef) {
      // chatObject.postId = docRef.id;
      console.log("Post written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  console.log('chat object which needs to be added to the user collection is');
  console.log(chatObject);
  //func to add the post to user db
};

async function getAllChats() {
  console.log("getting all chats");
  const snapshot = await firebase.firestore().collection('chats').orderBy("createdAt","asc").get()
  return snapshot.docs.map(doc => doc.data());
};

export {
  // updateUser,
  addPosts,
  getAllColleges,
  getCollege,
  addCollege,
  // deletePosts,
  getAllPosts,
  getAllPostsforCollege,
  getUser,
  //getPost,
  updateProfilePic,
  updateAccountInfo,
  addCommentToPost,
  getUserPosts,
  addChat,
  getAllChats
};


