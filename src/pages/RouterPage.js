import React , {Component} from 'react';
import MainPage from './MainPage';
import {BrowserRouter , Route , Link} from 'react-router-dom';

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
                    <Route path="/posts/:id" component={() => <h1>Testing Route</h1>}/>

                </div>
            </BrowserRouter>
        )
    }

}