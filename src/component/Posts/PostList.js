import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import PostItem from "./PostItem";

export default class PostList extends Component
{
    render()
    {
        let keys = Object.keys(this.props.posts);

        return (
            <div style={{
                display: 'flex' ,
                flex : 7 ,
                justifyContent : 'space-between'
            }}>

                <PostItem
                    imageUrl="/images/section_1.jpg"
                    title="Some Title Some Title  Some Title  Some Title  Some Title "
                    shortDescription="SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING"
                    userName="Ali Faris"
                    date="2017-12-12"
                />

                <PostItem
                    imageUrl="/images/section_1.jpg"
                    shortDescription="SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING"
                    userName="Ali Faris"
                    date="2017-12-12"
                />

                <PostItem
                    imageUrl="/images/section_1.jpg"
                    shortDescription="SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING SOMETHING"
                    userName="Ali Faris"
                    date="2017-12-12"
                />

            </div>
        )
    }
}