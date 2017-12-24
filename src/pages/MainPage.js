import React , {Component} from 'react';
import {connect} from 'react-redux';
import {loginOrCreateFirebaseUser} from "../data/actions/manageUser";
import firebase from './../Firebase';
import PostList from "../component/PostList";
let db = firebase.database().ref().child('posts');

class MainPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {posts : []};
    }

    componentDidMount()
    {
        this.props.dispatch(loginOrCreateFirebaseUser());
        this.loadPosts();
    }

    loadPosts = () =>
    {
        db.on("value" , snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts : []});
                return;
            }

            console.log('value changed' , snap.val());
            this.setState({posts : snap.val()})
        })
    };

    render()
    {
        return(
            <div>
                <h1>Main Page</h1>

                <hr/>

                <PostList posts={this.state.posts}/>

                <hr/>

                <pre>
                    {this.prop}
                </pre>

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
