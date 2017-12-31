import React , {Component} from 'react';
import {Comment as SemanticComment} from 'semantic-ui-react';

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
                        <div>{this.timestampToDate(this.props.time)}</div>
                    </SemanticComment.Metadata>
                    <SemanticComment.Text>{this.props.comment}</SemanticComment.Text>
                    {/*<SemanticComment.Actions>*/}
                        {/*<Comment.Action>Reply</Comment.Action>*/}
                    {/*</SemanticComment.Actions>*/}
                </SemanticComment.Content>
            </SemanticComment>
        )
    }

    timestampToDate = (timestamp) =>
    {
        let a = new Date(timestamp);
        //let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = a.getMonth() + 1;   //months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        //let sec = a.getSeconds();
        return year + '-' + month + '-' + date + ' ' + hour + ':' + min;

    }

}