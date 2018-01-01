import React , {Component} from 'react';
import {Comment as SemanticComment} from 'semantic-ui-react';
import TimeUtils from "../../utils/TimeUtils";

export default class Comment extends Component
{

    render()
    {
        return (
            <SemanticComment>
                <SemanticComment.Avatar src={parseInt(this.props.gender) === 2 ? '/images/woman.png' : '/images/man.png'} />
                <SemanticComment.Content>
                    <SemanticComment.Author as='a'>{this.props.userDisplayName}</SemanticComment.Author>
                    <SemanticComment.Metadata>
                        <div>{TimeUtils.timestampToDate(this.props.time)}</div>
                    </SemanticComment.Metadata>
                    <SemanticComment.Text>{this.props.comment}</SemanticComment.Text>
                    {/*<SemanticComment.Actions>*/}
                        {/*<Comment.Action>Reply</Comment.Action>*/}
                    {/*</SemanticComment.Actions>*/}
                </SemanticComment.Content>
            </SemanticComment>
        )
    }

}