import React, {Component} from 'react';
import firebase from './../Firebase';
import {Divider, Header, Icon, Loader, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import PostList from "../component/Posts/PostList";
import AppUtils from "../utils/AppUtils";
import FirebaseUtils from "../utils/FirebaseUtils";

export default class SectionPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {posts: {}, processing: false , user : null};
    }

    componentDidMount()
    {
        this.loadPosts();
    }

    componentWillUnmount()
    {
        this.detach();
    }

    loadPosts = async () =>
    {
        this.detach();
        this.setState({processing: true});

        await this.setupPostReference();

        this.postsRef.on("value", snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts: {}, processing: false});
                return;
            }
            this.setState({posts: snap.val(), processing: false});
        }, (e) =>
        {
            console.log(e);
            this.detach();
            this.setState({posts: {}, processing: false, error: true});
        })

    };

    setupPostReference = async () =>
    {
        let user = await FirebaseUtils.getCurrentUser();
        this.setState({user : user});

        let dbChildRef = "posts/" + this.props.id;
         if (this.props.myPosts)
        {
            this.postsRef = firebase.database().ref().child(dbChildRef).orderByChild("userId").equalTo(firebase.auth().currentUser.uid);
        }
        else
        {
            this.postsRef = firebase.database().ref().child(dbChildRef);
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
                    {this.state.user && <Link className="ui blue large button" to={"/my-posts/" + this.props.id + "/" + this.state.user.gender}>منشوراتي</Link>}
                    <Link className="ui green large button" to={"/write/" + this.props.id}>اكتب منشور</Link>
                </div>

                <Header>{AppUtils.sectionIdToTitle(this.props.id)}</Header>

                <Segment className="noSegment" style={{minHeight: '500px'}}>

                    <Loader size={'large'} active={this.state.processing}>جاري التحميل</Loader>

                    <Divider hidden/>

                    {keys.length > 0 && <PostList sectionId={this.props.id} posts={this.state.posts}/>}
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
                <Header as={'h2'}>{this.state.error ? 'توجد مشكلة' : 'لا توجد بيانات'}</Header>

                <Divider hidden/>
            </div>
        )
    }

}