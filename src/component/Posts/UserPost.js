import React, {Component} from 'react';
import {Header, Divider , Segment} from 'semantic-ui-react';
import PostList from "./PostList";
import firebase from './../../Firebase';

export default class UserPost extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {posts: {} , loading : false};
    }

    componentWillReceiveProps(next)
    {
        this.props.userId && this.loadPosts(next.sectionId);
    }

    componentWillUnmount()
    {
        this.detach();
    }

    loadPosts = (sectionId) =>
    {
        this.detach();
        this.setState({loading: true , post : {}});
        this.postRef = firebase.database().ref().child('posts/' + sectionId).orderByChild("userId").equalTo(this.props.userId);
        this.postRef.on("value", snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts: {}, loading: false});
                return;
            }

            let posts = snap.val();
            posts = this.removeCurrentPostFromResult(posts);
            this.setState({posts: posts, loading: false});
        })

    };

    removeCurrentPostFromResult = (posts) =>
    {
        let keys = Object.keys(posts);
        let newPosts = {};
        keys.map(item =>
        {
            if (item !== this.props.postId)
                newPosts[item] = posts[item];
        });

        return newPosts;
    };


    detach = () =>
    {
        if (this.postRef !== null && this.postRef !== undefined)
        {
            this.postRef.off();
        }
    };


    render()
    {
        return (
            Object.keys(this.state.posts).length === 0 ?
                null
                :
                <div>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Segment className="noSegment" color={'blue'}>
                        <div>
                            <Header>مواضيع هذا العضو : </Header>
                            <PostList sectionId={this.props.sectionId} posts={this.state.posts}/>
                        </div>
                    </Segment>
                </div>
        )
    }

}