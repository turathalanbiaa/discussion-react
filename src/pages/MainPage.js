import React , {Component} from 'react';
import {connect} from 'react-redux';
import {loginOrCreateFirebaseUser} from "../data/actions/manageUser";

class MainPage extends Component
{

    componentDidMount()
    {
        this.props.dispatch(loginOrCreateFirebaseUser());
    }

    render()
    {
        return(
            <div>
                {this.props.firebaseError && <h1>An Error Happen , Contact Management</h1>}
                {this.props.firebaseProcessing && <h1>Processing</h1>}
                {this.props.firebaseLogin && <h1>User Logged In</h1>}
            </div>
        )
    }
}

export default connect((store) =>
{
    return {
        firebaseLogin : store.user.isLogin ,
        firebaseUser : store.user.user ,
        firebaseProcessing : store.user.processing ,
        firebaseError : store.user.error
    }
})(MainPage)
