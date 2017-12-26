import React , {Component} from 'react';
import firebase from './../Firebase';
import Post from "../component/Post";
import FirebaseUtils from "../utils/FirebaseUtils";

export default class PostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post : {} , comments : {}};
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
        this.postRef.on("value" , snap =>
        {
            let post = snap.val();
            
            if(post === null)
            {
                this.setState({post : {}});
                return;
            }

            this.setState({post : snap.val()});
        });
    };

    loadComments = (id) =>
    {
        this.detachComments();

        let commentRefString = "comments/" + id;
        this.commentsRef = firebase.database().ref().child(commentRefString);
        this.commentsRef.on("value" , snap =>
        {
            let comments = snap.val();
            if(comments === null)
            {
                this.setState({comments : {}});
                return;
            }

            this.setState({comments : snap.val()});
            console.log(this.state.comments);
        });
    };

    detachPost = () => {
        if(this.postRef !== null && this.postRef !== undefined)
        {
            this.postRef.off();
        }
    };

    detachComments = () => {
        if(this.commentsRef !== null && this.commentsRef !== undefined)
        {
            this.commentsRef.off();
        }
    };

    render()
    {
        return (
            <div>
                <h1>Post Page</h1>
                <hr/>
                {this.state.post && <Post id={this.props.id} post={this.state.post}/>}
                <hr/>

                <hr/>
                <h1>Comments</h1>
                {<pre>{JSON.stringify(this.state.comments)}</pre>}
                <hr/>

                <label>Write Your Comment</label>
                <input type="text" onChange={this.onCommentChange}/>
                <button onClick={this.writeComment}>Save</button>

            </div>
        )
    }



    onCommentChange = (event) =>
    {
        let comment = event.target.value;
        this.setState({comment : comment});
    };

    writeComment = async () =>
    {
        let time = new Date();
        let user = await FirebaseUtils.getCurrentUser();
        let comment = firebase.database().ref().child(`comments/${this.props.id}`).push();
        comment.set({
            comment: this.state.comment,
            userId: user.uid,
            gender : user.gender ,
            time : time.getTime()
        });
    }


}