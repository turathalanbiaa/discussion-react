import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyD2rmHOGVx5JUxpTI-fbUM6TmBySb-E5wU",
    authDomain: "discussion-38505.firebaseapp.com",
    databaseURL: "https://discussion-38505.firebaseio.com",
    projectId: "discussion-38505",
    storageBucket: "discussion-38505.appspot.com",
    messagingSenderId: "949089035434"
};
firebase.initializeApp(config);


let user = firebase.auth().currentUser;
let email = window.user.email;
let password = window.user.password;


if (user)
{
    if(user.email  !== email && email !== "")
    {
        firebase.auth().signOut();
        window.location = "http://turathalanbiaa.com/login";
    }
}
else
{
    firebase.auth().signInWithEmailAndPassword(email , password).then(user => console.log('user logged in' , user)).catch((e) =>
    {
        console.log('cannot login , user will be created' , e);
        firebase.auth().createUserWithEmailAndPassword(email , password).then((user) =>
        {
            console.log('user created ' , user);
        }).catch((e) =>
        {
            console.log('error creating user' , e);
        });
    });
}

export default firebase;