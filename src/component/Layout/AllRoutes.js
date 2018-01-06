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
                <Route exact path="/posts/:sectionId/:gender/:id" component={this.postPageRoute}/>
                <Route exact path="/section/:id" component={this.sectionPageRoute}/>
                <Route exact path="/write/:id" component={this.writePost}/>
                <Route exact path="/post/edit/:sectionId/:gender/:id" component={this.editPost}/>
                <Route exact path="/my-posts/:sectionId/:gender" component={ this.myPosts }/>

            </div>
        )
    }

    postPageRoute = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.id)
            return <PostPage sectionId={params.sectionId} gender={params.gender} id={params.id}/>;
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
            return <EditPostPage sectionId={params.sectionId} gender={params.gender} postId={params.id}/>;

        return null;
    };

    myPosts = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.sectionId)
            return <SectionPage myPosts id={params.sectionId} gender={params.gender}/>;

        return null;
    }

}