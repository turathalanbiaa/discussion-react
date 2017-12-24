import React , {Component} from 'react';
import {connect} from 'react-redux';
import {loginOrCreateFirebaseUser} from "../data/actions/manageUser";
import firebase from './../Firebase';
import PostList from "../component/PostList";

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
        this.detach();
        this.postsRef = firebase.database().ref().child('posts');
        this.postsRef.on("value" , snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts : []});
                return;
            }
            this.setState({posts : snap.val()})
        })
    };


    componentWillUnmount()
    {
        this.detach();
    }

    detach = () =>
    {
        if(this.postsRef !== null && this.postsRef !== undefined)
        {
            this.postsRef.off();
        }
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
