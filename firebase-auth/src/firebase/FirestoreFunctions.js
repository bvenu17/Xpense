import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseApp from './Firebase'

let db  = firebaseApp.firestore();

// async function updateUser(userObject) {
//     await db.collection('users').doc(uid).set(userObject)
// };

async function addPosts(uid, postObject) {
    await db.collection('posts').doc(uid).set(postObject);
    await db.collection('users').doc(uid).update({
        posts : firebase.firestore.FieldValue.arrayUnion(postObject)
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
        } else 
        {
          //console.log('Document data:', doc.data());
          console.log("Inside firestore functions: ", doc.data())
          return doc.data();
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    };


async function getPost(uid) {
let postRef = await db.collection('posts').doc(uid);
let getDoc = postRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else 
    {
      return doc.data()
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
};


async function getAllPosts(collegeID){
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

export {
    // updateUser,
    addPosts,
    // deletePosts,
    getAllPosts,
    getUser,
    getPost
};

    
