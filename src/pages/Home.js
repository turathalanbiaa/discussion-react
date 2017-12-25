import React , {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component
{

    render()
    {
        return(
            <ul>

                <li><Link to="/section/1">Men</Link></li>
                <li><Link to="/section/2">Women / Management</Link></li>
                <li><Link to="/section/3">Women / Scientific</Link></li>
                <li><Link to="/section/4">Discussion / Introduction Level</Link></li>
                <li><Link to="/section/5">Discussion / First Level</Link></li>
                <li><Link to="/section/6">Discussion / Second Level</Link></li>
                <li><Link to="/section/7">Discussion / Third Level</Link></li>

                <li><Link to="/my-posts">My Posts</Link></li>

            </ul>
        )
    }

}