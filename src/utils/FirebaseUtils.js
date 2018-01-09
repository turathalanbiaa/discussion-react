import firebase from './../Firebase';

export default class FirebaseUtils
{

    static getCurrentUser()
    {
        return new Promise(function(resolve , reject)
        {
            let currentUser = firebase.auth().currentUser;
            if (currentUser === null)
            {
                resolve({gender : null , level : null , type : null});
                return;
            }
            firebase.database().ref().child(`users/${currentUser.uid}`).once("value").then( snap =>
            {
                let user = snap.val();
                if (user === null)
                {
                    resolve({gender : null , level : null , type : null , ...currentUser});
                    return;
                }
                resolve({...currentUser , ...user});
            });
        });
    }
}