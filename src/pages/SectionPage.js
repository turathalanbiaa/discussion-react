import React, {Component} from 'react';
import firebase from './../Firebase';
import PostList from "../component/Posts/PostList";
import {Segment , Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class SectionPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {posts : []};
    }

    componentDidMount()
    {
        this.loadPosts();
    }


    loadPosts = () =>
    {
        this.detach();
        if(this.props.myPosts)
        {
            this.postsRef = firebase.database().ref().child('posts').orderByChild("userId").equalTo(firebase.auth().currentUser.uid);
        }
        else
        {
            this.postsRef = firebase.database().ref().child('posts').orderByChild("type").equalTo(this.props.id);
        }

        this.postsRef.on("value" , snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts : []});
                return;
            }
            this.setState({posts : snap.val()})
        })
    };


    componentWillUnmount()
    {
        this.detach();
    }

    detach = () =>
    {
        if(this.postsRef !== null && this.postsRef !== undefined)
        {
            this.postsRef.off();
        }
    };

    render()
    {
        return(
            <div>

                <div>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                    <Link className="ui green large button" to={"/write/" + this.props.id}>اكتب منشور</Link>
                </div>

                <Segment className="noSegment" style={{minHeight : '500px'}}>

                    <Divider hidden/>
                    <PostList posts={this.state.posts}/>

                </Segment>

            </div>
        )
    }

}