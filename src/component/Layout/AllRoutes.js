import React , {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from "../../pages/Home";
import NewPostPage from "../../pages/NewPostPage";
import SectionPage from "../../pages/SectionPage";
import PostPage from "../../pages/PostPage";

export default class AllRoutes extends Component
{

    render()
    {
        return (
            <div>

                <Route exact path="/" component={() => <Home/>}/>
                <Route exact path="/posts/:id" component={this.postPageRoute}/>
                <Route exact path="/section/:id" component={this.sectionPageRoute}/>
                <Route exact path="/new-post" component={ () => <NewPostPage/>}/>
                <Route exact path="/my-posts" component={ () => <SectionPage myPosts /> }/>

            </div>
        )
    }

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