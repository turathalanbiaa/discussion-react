import React, {Component} from 'react';
import firebase from './../Firebase';
import Post from "../component/Post";
import {Header, Segment, Loader , Divider} from 'semantic-ui-react';
import Comments from "../component/Comments/Comments";
import {Link} from 'react-router-dom';
import PostList from "../component/Posts/PostList";
import UserPost from "../component/Posts/UserPost";

export default class PostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post: {}, comments: {} , userPosts : {}, loadingPost: false, loadingComments: false};
    }

    //region COMPONENT LIFE CYCLE
    componentDidMount()
    {
        this.loadPost(this.props.id);
        this.loadComments(this.props.id);
    }

    componentWillReceiveProps(nextProp)
    {
        this.loadPost(nextProp.id);
        this.loadComments(nextProp.id);
    }

    componentWillUnmount()
    {
        this.detachPost();
        this.detachComments();
    }
    //endregion

    //region LOADING
    loadPost = (id) =>
    {
        this.detachPost();
        let postRefString = "posts/" + id;
        this.setState({loadingPost: true});
        this.postRef = firebase.database().ref().child(postRefString);
        this.postRef.on("value", snap =>
        {
            this.setState({loadingPost: false});
            let post = snap.val();

            if (post === null)
            {
                this.setState({post: {}});
                return;
            }

            this.setState({post: snap.val()});
        });
    };

    loadComments = (id) =>
    {
        this.detachComments();

        let commentRefString = "comments/" + id;
        this.setState({loadingComments: true});
        this.commentsRef = firebase.database().ref().child(commentRefString);
        this.commentsRef.on("value", snap =>
        {
            this.setState({loadingComments: false});
            let comments = snap.val();
            if (comments === null)
            {
                this.setState({comments: {}});
                return;
            }

            this.setState({comments: snap.val()});
        });
    };


    //endregion

    //region DETACHING
    detachPost = () =>
    {
        if (this.postRef !== null && this.postRef !== undefined)
        {
            this.postRef.off();
        }
    };

    detachComments = () =>
    {
        if (this.commentsRef !== null && this.commentsRef !== undefined)
        {
            this.commentsRef.off();
        }
    };


    //endregion

    render()
    {
        return (
            <div>

                <div>
                    <a className="ui blue large button" onClick={() => window.history.back()}>رجوع</a>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                </div>

                <Segment style={{minHeight : '400px'}}>

                    {
                        !this.state.loadingPost && !this.state.loadingComments ?
                            <div>

                                {this.state.post && <Post id={this.props.id} post={this.state.post}/>}

                                <Header as={'h2'}>التعليقات : </Header>
                                <Comments postId={this.props.id} comments={this.state.comments}/>

                                <Divider/>

                                {this.state.post.userId && <UserPost userId={this.state.post.userId} postId={this.props.id}/>}

                            </div>
                            :
                            <Loader active/>
                    }

                </Segment>

            </div>
        )
    }

}