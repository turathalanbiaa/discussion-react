import firebase from './../../Firebase';

export function loginOrCreateFirebaseUser()
{
    return function(dispatch)
    {
        let email = window.user.email;
        let password = window.user.password;
        let name = window.user.name;

        let gender = window.user.gender ;
        let type = window.user.type;
        let level = window.user.level;


        dispatch({type : 'LOGGING_USER'});

        firebase.auth().onAuthStateChanged(user =>
        {
            if (user)
            {
                loginCurrentUserOrSignOutOnDifferentUser(dispatch , user , name , email);
            }
            else
            {
                if(email.trim() === "" || password.trim() === "")
                {
                    dispatch({type : 'CANNOT_LOGIN'});
                    return;
                }

                firebase.auth().signInWithEmailAndPassword(email , password).
                then((user)=>
                {
                    dispatch({type : 'USER_LOGGED_IN' , payload : user});
                }).catch(() =>
                {
                    if(!gender || !type || !level)
                    {
                        dispatch({type : 'CANNOT_CREATE_USER'});
                        return;
                    }
                    
                    dispatch({type : 'CREATING_USER'});
                    firebase.auth().createUserWithEmailAndPassword(email , password).then(async (user) =>
                    {
                        createUser(dispatch , user , name);
                    }).catch(() =>
                    {
                        dispatch({type : 'CANNOT_CREATE_USER'});
                    });
                });
            }
        });
    }
}

function isFirebaseUserIsTurathUser(email , user)
{
    return (user && (user.email === email || email === ""));
}

function saveUserToDatabase(uid)
{
    firebase.database().ref().child(`users/${uid}`).set({
        gender: window.user.gender,
        level: window.user.level,
        type: window.user.type
    });
}

function loginCurrentUserOrSignOutOnDifferentUser(dispatch , user , name , email)
{
    if (!isFirebaseUserIsTurathUser(email , user))
    {
        firebase.auth().signOut();
        dispatch({type : 'FIREBASE_USER_NOT_TURATH_USER'});
    }
    else
    {
        if(name !== user.displayName)
        {
            user.updateProfile({displayName:name});
        }
        dispatch({type : 'USER_ALREADY_LOGGED_IN' , payload : user});
    }
}

async function createUser(dispatch , user, name)
{
    await user.updateProfile({displayName: name});
    await saveUserToDatabase(user.uid);

    dispatch({type: 'USER_CREATED', payload: user});
}