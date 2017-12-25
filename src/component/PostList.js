import React , {Component} from 'react';
import {Link} from 'react-router-dom';

export default class PostList extends Component
{
    render()
    {
        let keys = Object.keys(this.props.posts);
        console.log(this.props.posts);
        return (
            <ul>
                {
                    keys.map(item =>
                    {
                        return (<li key={item}>
                            <div>
                                <Link to={"/posts/" + item}>Something Just Like This</Link>
                                {item + " - " + this.props.posts[item].title}
                            </div>
                        </li>)
                    })
                }
            </ul>
        )
    }
}