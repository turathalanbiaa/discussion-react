import React, {Component} from 'react';
import firebase from './../Firebase';
import {Divider, Header, Icon, Loader, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import PostList from "../component/Posts/PostList";

export default class SectionPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {posts: {}, processing: false};
    }

    componentDidMount()
    {
        this.loadPosts();
    }

    componentWillUnmount()
    {
        this.detach();
    }

    loadPosts = () =>
    {
        this.detach();
        this.setupPostReference();

        this.setState({processing: true});
        this.postsRef.on("value", snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts: {}, processing: false});
                return;
            }
            this.setState({posts: snap.val(), processing: false});
        })

    };

    setupPostReference = () =>
    {
        if (this.props.myPosts)
        {
            this.postsRef = firebase.database().ref().child('posts').orderByChild("userId").equalTo(firebase.auth().currentUser.uid);
        }
        else
        {
            this.postsRef = firebase.database().ref().child('posts').orderByChild("type").equalTo(this.props.id);
        }
    };

    detach = () =>
    {
        if (this.postsRef !== null && this.postsRef !== undefined)
        {
            this.postsRef.off();
        }
    };

    render()
    {
        let keys = Object.keys(this.state.posts);
        return (
            <div>

                <div>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                    <Link className="ui green large button" to={"/write/" + this.props.id}>اكتب منشور</Link>
                </div>

                <Segment className="noSegment" style={{minHeight: '500px'}}>

                    <Loader size={'large'} active={this.state.processing}>جاري التحميل</Loader>

                    <Divider hidden/>

                    {keys.length > 0 && <PostList posts={this.state.posts}/>}
                    {(keys.length === 0 && !this.state.processing) && this.noDataFound()}

                    <Divider hidden/>

                </Segment>

            </div>
        )
    }

    noDataFound = () =>
    {
        return (
            <div style={{textAlign: 'center'}}>
                <Divider hidden/>

                <Icon color={'blue'} name={'database'} size={'huge'}/>
                <Header as={'h2'}>لا توجد بيانات</Header>

                <Divider hidden/>
            </div>
        )
    }

}