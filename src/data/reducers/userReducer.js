let initialState = {
    isLogin : false ,
    processing : false ,
    error : true
};
export default function(state=initialState , action)
{
    switch(action.type)
    {
        case 'FIREBASE_USER_NOT_TURATH_USER':
            return {isLogin : false , processing : false , error : false};

        case 'USER_ALREADY_LOGGED_IN':
            return {isLogin : true , processing : false , error : false};

        case 'LOGGING_USER':
            return {isLogin : false , processing : true , error : false};

        case 'USER_LOGGED_IN':
            return {isLogin : true , processing : false , error : false};

        case 'CREATING_USER':
            return {isLogin : true , processing : true , error : false};

        case 'USER_CREATED':
            return {isLogin : true , processing : false , error : false};

        case 'CANNOT_CREATE_USER':
            return {isLogin : false , processing : false , error : true};

        case 'CANNOT_LOGIN':
            return {isLogin : false , processing : false , error : true};

        default : return {isLogin : false , processing : false , error : false};
    }
}