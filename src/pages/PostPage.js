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
        this.loadPost(this.props.id);
    }

    componentWillReceiveProps(nextProp)
    {
        this.loadPost(nextProp.id);
    }

    componentWillUnmount()
    {
        this.detach();
    }

    loadPost = (id) =>
    {
        this.detach();

        let postRefString = "posts/" + id;
        this.postRef = firebase.database().ref().child(postRefString);
        console.log('loading post');
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

    detach = () =>
    {
        console.log(this.postRef);
        if(this.postRef !== null && this.postRef !== undefined)
        {
            console.log('detaching');
            this.postRef.off();
        }
    };

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