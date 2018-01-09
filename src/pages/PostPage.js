import React, {Component} from 'react';
import firebase from './../Firebase';
import Post from "../component/Posts/Post";
import {Header, Loader, Segment} from 'semantic-ui-react';
import Comments from "../component/Comments/Comments";
import {Link} from 'react-router-dom';
import UserPost from "../component/Posts/UserPost";
import FirebaseUtils from "../utils/FirebaseUtils";
import AppUtils from "../utils/AppUtils";

export default class PostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post: {}, loading: false, user: null, deleted: false};
    }

    componentDidMount()
    {
        let sectionId = this.props.sectionId;
        this.loadPost(this.props.id , sectionId);

        FirebaseUtils.getCurrentUser().then((user) =>
        {
            this.setState({user: user})
        })
    }

    componentWillReceiveProps(nextProp)
    {
        this.loadPost(nextProp.id , nextProp.sectionId , nextProp.gender);
    }

    componentWillUnmount()
    {
        this.detachPost();
    }

    loadPost = (id , sectionId) =>
    {
        this.setState({loading: true});
        this.detachPost();
        let dbRef = "posts/" + sectionId + "/" + id;
        this.postRef = firebase.database().ref().child(dbRef);
        this.postRef.on("value", snap =>
        {
            let post = snap.val();
            if (post === null)
            {
                this.setState({post: {}, loading: false});
                return;
            }

            this.setState({post: snap.val(), loading: false});
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
        this.detachPost();
        this.setState({loading: true});
        let postsRef = "posts/" + this.props.sectionId + "/" + this.props.id;
        let commentsRef = "comments/" + this.props.sectionId + "/" + this.props.id;
        //REMOVE COMMENTS BEFORE POSTS SO SECURITY RULES WILL PASS
        await firebase.database().ref().child(commentsRef).remove();
        await firebase.database().ref().child(postsRef).remove();
        this.setState({loading: false, deleted: true});
    };

    render()
    {
        return (
            <div>

                <div>
                    <a className="ui blue large button" onClick={() => window.history.back()}>رجوع</a>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                </div>

                {(!this.state.loading && Object.keys(this.state.post).length > 0) &&
                <Header>{AppUtils.sectionIdToTitle(this.state.post.type)}</Header>}

                <Segment className="noSegment" style={{minHeight: '400px'}}>

                    {
                        !this.state.loading ?
                            (this.state.deleted ? this.postDeleted() : this.postContent())
                            :
                            <Loader active/>
                    }

                </Segment>

            </div>
        )
    }

    postDeleted = () =>
    {
        return (
            <Segment color={'red'} inverted textAlign={'center'}><Header>تم حذف المنشور</Header></Segment>
        )
    };
    postContent = () =>
    {
        return (
            Object.keys(this.state.post).length > 0 ?
                <div>
                    <Post deleteAction={this.deletePost}
                          sectionId={this.props.sectionId} gender={this.props.gender}
                          canEdit={this.state.user && (this.state.user.type === "3" || this.state.user.uid === this.state.post.userId)}
                          id={this.props.id} post={this.state.post}/>
                    <Comments sectionId={this.props.sectionId} gender={this.props.gender} postId={this.props.id}/>
                    <UserPost sectionId={this.props.sectionId} gender={this.props.gender} userId={this.state.post.userId} postId={this.props.id}/>
                </div>
                :
                <Header size={'large'} textAlign={'center'}>لا توجد بيانات</Header>
        )
    };

}