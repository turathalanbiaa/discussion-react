import React, {Component} from 'react';
import SectionPage from './SectionPage';
import {BrowserRouter, Route} from 'react-router-dom';
import PostPage from "./PostPage";
import NewPostPage from "./NewPostPage";
import Home from "./Home";
import {connect} from 'react-redux';
import {loginOrCreateFirebaseUser} from "../data/actions/manageUser";


class RouterPage extends Component
{

    componentDidMount()
    {
        this.props.dispatch(loginOrCreateFirebaseUser());
    }


    render()
    {
        return (
            <BrowserRouter>
                {
                    this.props.firebaseLogin ?  this.routes() : this.notLoggedIn()
                }
            </BrowserRouter>
        )
    }

    routes = () =>
    {
        return (
            <div>

                <Route exact path="/" component={() => <Home/>}/>
                <Route exact path="/posts/:id" component={this.postPageRoute}/>
                <Route exact path="/section/:id" component={this.sectionPageRoute}/>
                <Route exact path="/new-post" component={() => <NewPostPage/>}/>
                <Route exact path="/my-posts" component={() => <SectionPage myPosts />}/>

            </div>
        )
    };

    notLoggedIn = () =>
    {
        return (
            this.props.firebaseProcessing ? <h1>Please Wait ...</h1> : <h1>Cannot Login</h1>
        )
    };


    postPageRoute = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.id)
            return <PostPage id={params.id}/>;
        return null;
    };

    sectionPageRoute = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.id)
            return <SectionPage id={params.id}/>;
        return null;
    };

}

export default connect((store) =>
{
    return {
        firebaseLogin : store.user.isLogin ,
        firebaseUser : store.user.user ,
        firebaseProcessing : store.user.processing ,
        firebaseError : store.user.error
    }
})(RouterPage)
