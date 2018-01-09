import React , {Component} from 'react';
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import firebase from './../../Firebase';
import {Header , Divider} from 'semantic-ui-react';

export default class Comments extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {comments: {} , loading: false};
    }

    componentDidMount()
    {
        this.load(this.props.postId , this.props.sectionId );
    }

    componentWillReceiveProps(next)
    {
        this.load(next.postId , next.sectionId);
    }

    componentWillUnmount()
    {
        this.detach();
    }

    load = (id , sectionId) =>
    {
        this.detach();

        let commentRefString = "comments/" + sectionId + "/" + id;
        this.setState({loading: true});
        this.commentsRef = firebase.database().ref().child(commentRefString);
        this.commentsRef.on("value", snap =>
        {
            let comments = snap.val();
            if (comments === null)
            {
                this.setState({comments: {} , loading: false});
                return;
            }

            this.setState({comments: snap.val() , loading: false});
        });
    };

    detach = () =>
    {
        if (this.commentsRef !== null && this.commentsRef !== undefined)
        {
            this.commentsRef.off();
        }
    };

    render()
    {
        return (
            this.state.loading ?
                null
                :
                <div>
                    <Divider/>
                    {Object.keys(this.state.comments).length > 0 && <Header as={'h2'}>التعليقات : </Header>}
                    <CommentList comments={this.state.comments}/>
                    <CommentBox sectionId={this.props.sectionId} gender={this.props.gender} postId={this.props.postId}/>
                    <Divider hidden/>
                </div>
        )
    }

}