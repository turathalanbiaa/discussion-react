import React , {Component} from 'react';
import MainPage from './MainPage';
import {BrowserRouter , Route , Link} from 'react-router-dom';
import PostPage from "./PostPage";

export default class RouterPage extends Component
{

    render()
    {
        return (
            <BrowserRouter>
                <div>

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/posts/some-post-id">About</Link></li>
                    </ul>

                    <hr/>

                    <Route exact path="/" component={() => <MainPage/>}/>
                    <Route path="/posts/:id" component={this.postPageRoute}/>

                </div>
            </BrowserRouter>
        )
    }


    postPageRoute = (routeData) =>
    {
        let params = routeData.match.params;
        if (params.id)
            return <PostPage id={params.id}/>;
        return null;
    }

}