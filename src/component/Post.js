import React , {Component} from 'react';

export default class Post extends Component
{


    render()
    {
        return (
            <div id={this.props.post.id}>
                <h5>{this.props.post.userDisplayName}</h5>
                <h1>{this.props.post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: this.props.post.content}}/>
                {this.props.post.photoUrl && <img src={this.props.post.photoUrl} width="400" height="400"/>}
            </div>
        )
    }

}