import firebase from './../../Firebase';

export function loginOrCreateFirebaseUser()
{
    return function(dispatch)
    {
        dispatch({type : 'LOGGING_USER'});

        firebase.auth().onAuthStateChanged(user =>
        {
            let email = window.user.email;
            let password = window.user.password;

            if (user)
            {
                if (!isFirebaseUserIsTurathUser())
                {
                    firebase.auth().signOut();
                    dispatch({type : 'FIREBASE_USER_NOT_TURATH_USER'});
                }
                else
                    dispatch({type : 'USER_ALREADY_LOGGED_IN' , payload : user});
            }
            else
            {
                dispatch({type : 'LOGGING_USER'});
                firebase.auth().signInWithEmailAndPassword(email , password).
                then((user)=>
                {
                    dispatch({type : 'USER_LOGGED_IN' , payload : user});
                }).catch(() =>
                {
                    dispatch({type : 'CREATING_USER'});
                    firebase.auth().createUserWithEmailAndPassword(email , password).then(async (user) =>
                    {
                        await user.updateProfile({displayName: window.user.name});

                        firebase.database().ref().child(`users/${user.uid}`).set({
                            gender: window.user.gender,
                            level: window.user.level,
                            type: window.user.type
                        });

                        dispatch({type: 'USER_CREATED', payload: user});
                    }).catch(() =>
                    {
                        dispatch({type : 'CANNOT_CREATE_USER'});
                    });
                });
            }
        });
    }
}

function isFirebaseUserIsTurathUser()
{
    let email = window.user.email;
    let user = firebase.auth().currentUser;
    return (user && user.email === email);
}