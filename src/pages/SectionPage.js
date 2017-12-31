import React, {Component} from 'react';
import firebase from './../Firebase';
import PostList from "../component/Posts/PostList";
import {Segment , Divider , Header , Icon , Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import FirebaseUtils from "../utils/FirebaseUtils";

export default class SectionPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {posts : [] , processing : false};
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

        this.setState({processing : true});

        this.postsRef.on("value" , snap =>
        {
            if (snap.val() === null)
            {
                this.setState({posts : [] , processing: false});
                return;
            }
            this.setState({posts : snap.val() , processing : false});
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
        FirebaseUtils.getCurrentUser().then(user => console.log(user));

        return(
            <div>

                <div>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                    <Link className="ui green large button" to={"/write/" + this.props.id}>اكتب منشور</Link>
                </div>

                <Segment className="noSegment" style={{minHeight : '500px'}}>

                    <Loader size={'large'} active={this.state.processing}>جاري التحميل</Loader>

                    <Divider hidden/>

                    <PostList posts={this.state.posts}/>

                    {this.state.posts.length > 0 && <PostList posts={this.state.posts}/>}
                    {(this.state.posts.length === 0 && !this.state.processing) && this.noDataFound()}

                    <Divider hidden/>

                </Segment>

            </div>
        )
    }

    noDataFound = () =>
    {
        return (
            <div style={{textAlign : 'center'}}>
                <Divider hidden/>

                <Icon color={'violet'} name={'database'} size={'huge'}/>
                <Header as={'h2'} >لا توجد بيانات</Header>

                <Divider hidden/>
            </div>
        )
    }

}