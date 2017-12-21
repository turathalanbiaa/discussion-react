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
            break;

        case 'USER_ALREADY_LOGGED_IN':
            return {isLogin : true , processing : false , error : false};
            break;

        case 'LOGGING_USER':
            return {isLogin : false , processing : true , error : false};
            break;

        case 'USER_LOGGED_IN':
            return {isLogin : true , processing : false , error : false};
            break;

        case 'CREATING_USER':
            return {isLogin : true , processing : true , error : false};
            break;

        case 'USER_CREATED':
            return {isLogin : true , processing : false , error : false};
            break;

        case 'CANNOT_CREATE_USER':
            return {isLogin : false , processing : false , error : true};
            break;
    }

    return state;
}