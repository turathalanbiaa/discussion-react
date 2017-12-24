import React , {Component} from 'react';
import firebase from './../Firebase';

export default class PostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post : {}};
    }

    componentDidMount()
    {
        let postRef = "posts/" + this.props.id;
        firebase.database().ref().child(postRef).on("value" , snap =>
        {
            console.log(snap.val());
            this.setState({post : snap.val()});
        });
    }

    render()
    {
        return (
            <div>
                <h1>Post Page</h1>
                <span>ID : {this.props.id}</span>
                {
                    this.state.post && <pre>{JSON.stringify(this.state.post)}</pre>
                }
            </div>
        )
    }

}