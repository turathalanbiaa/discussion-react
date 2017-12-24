import React , {Component} from 'react';

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
                        return (<li key={item}>{item + " - " + this.props.posts[item].title}</li>)
                    })
                }
            </ul>
        )
    }
}