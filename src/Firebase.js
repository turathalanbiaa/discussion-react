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

export default firebase;