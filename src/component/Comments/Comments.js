import React , {Component} from 'react';
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

export default class Comments extends Component
{

    render()
    {
        return (
            <div>
                <CommentList comments={this.props.comments}/>
                <CommentBox postId={this.props.postId}/>
            </div>
        )
    }

}