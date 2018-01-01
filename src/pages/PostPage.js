import React, {Component} from 'react';
import firebase from './../Firebase';
import Post from "../component/Post";
import {Divider, Loader, Segment , Header} from 'semantic-ui-react';
import Comments from "../component/Comments/Comments";
import {Link} from 'react-router-dom';
import UserPost from "../component/Posts/UserPost";
import FirebaseUtils from "../utils/FirebaseUtils";

export default class PostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post: {}, loading: false , user : null , deleted : false};
    }

    componentDidMount()
    {
        this.loadPost(this.props.id);
        FirebaseUtils.getCurrentUser().then((user) => {this.setState({user : user})})
    }

    componentWillReceiveProps(nextProp)
    {
        this.loadPost(nextProp.id);
    }

    componentWillUnmount()
    {
        this.detachPost();
    }

    loadPost = (id) =>
    {
        this.setState({loading : true});

        this.detachPost();
        this.postRef = firebase.database().ref().child("posts/" + id );
        this.postRef.on("value", snap =>
        {
            let post = snap.val();
            if (post === null)
            {
                this.setState({post: {} , loading: false});
                return;
            }

            this.setState({post: snap.val() , loading: false});
        });
    };

    detachPost = () =>
    {
        if (this.postRef !== null && this.postRef !== undefined)
        {
            this.postRef.off();
        }
    };

    deletePost = async () =>
    {
        console.log('delete');
        this.detachPost();
        this.setState({loading : true});
        await firebase.database().ref().child("posts/" + this.props.id).set({});
        await firebase.database().ref().child("comments/" + this.props.id).set({});
        this.setState({loading : false , deleted : true});
    };

    render()
    {
        return (
            <div>

                <div>
                    <a className="ui blue large button" onClick={() => window.history.back()}>رجوع</a>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                </div>

                <Segment style={{minHeight: '400px'}}>

                    {
                        !this.state.loading ?
                            (this.state.deleted ? <Segment color={'red'} inverted textAlign={'center'}><Header>تم حذف المنشور</Header></Segment> : this.postContent())
                            :
                            <Loader active/>
                    }

                </Segment>

            </div>
        )
    }

    postContent = () =>
    {
        return (
            <div>
                <Post deleteAction={this.deletePost} canEdit={this.state.user && (this.state.user.type === "3" || this.state.user.uid === this.state.post.userId)}
                      id={this.props.id} post={this.state.post}/>
                <Comments postId={this.props.id}/>
                <UserPost userId={this.state.post.userId} postId={this.props.id}/>
            </div>
        )
    };

}