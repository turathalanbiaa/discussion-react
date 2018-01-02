import React , {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from "../../pages/Home";
import WritePostPage from "../../pages/WritePostPage";
import SectionPage from "../../pages/SectionPage";
import PostPage from "../../pages/PostPage";
import EditPostPage from "../../pages/EditPostPage";

export default class AllRoutes extends Component
{

    render()
    {
        return (
            <div>

                <Route exact path="/" component={() => <Home/>}/>
                <Route exact path="/posts/:id" component={this.postPageRoute}/>
                <Route exact path="/section/:id" component={this.sectionPageRoute}/>
                <Route exact path="/write/:id" component={this.writePost}/>
                <Route exact path="/post/edit/:id" component={this.editPost}/>
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

    writePost = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.id)
            return <WritePostPage sectionId={params.id}/>;

        return null;
    };

    editPost = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.id)
            return <EditPostPage postId={params.id}/>;

        return null;
    }


}