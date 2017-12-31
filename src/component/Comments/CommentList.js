import React , {Component} from 'react';
import Comment from "./Comment";
import {Comment as SemanticComment} from 'semantic-ui-react';

export default class CommentList extends Component
{

    render()
    {
        let keys = this.props.comments ? Object.keys(this.props.comments) : [];
        console.log(keys);

        return (
            <SemanticComment.Group>
                {
                    keys.map(item =>
                    {
                        let comment = this.props.comments[item];
                        return (
                            <Comment
                                key={item}
                                comment={comment.comment}
                                userDisplayName={comment.userDisplayName}
                                gender={comment.gender}
                                time={comment.time}
                            />
                        )
                    })
                }
            </SemanticComment.Group>

        )
    }

}