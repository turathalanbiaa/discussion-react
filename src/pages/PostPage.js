import React, {Component} from 'react';
import firebase from './../Firebase';
import Post from "../component/Post";
import FirebaseUtils from "../utils/FirebaseUtils";
import {Header, Segment} from 'semantic-ui-react';
import Comments from "../component/Comments/Comments";

export default class PostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post: {}, comments: {}};
    }

    componentDidMount()
    {
        this.loadPost(this.props.id);
        this.loadComments(this.props.id)
    }

    componentWillReceiveProps(nextProp)
    {
        this.loadPost(nextProp.id);
        this.loadComments(nextProp.id)
    }

    componentWillUnmount()
    {
        this.detachPost();
        this.detachComments();
    }

    loadPost = (id) =>
    {
        this.detachPost();

        let postRefString = "posts/" + id;
        this.postRef = firebase.database().ref().child(postRefString);
        this.postRef.on("value", snap =>
        {
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
        this.commentsRef = firebase.database().ref().child(commentRefString);
        this.commentsRef.on("value", snap =>
        {
            let comments = snap.val();
            if (comments === null)
            {
                this.setState({comments: {}});
                return;
            }

            this.setState({comments: snap.val()});
        });
    };

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

    render()
    {
        return (
            <div>

                <Segment>

                    {this.state.post && <Post id={this.props.id} post={this.state.post}/>}

                    <Header as={'h2'}>التعليقات : </Header>

                    <Comments postId={this.props.id} comments={this.state.comments}/>

                </Segment>

            </div>
        )
    }





}