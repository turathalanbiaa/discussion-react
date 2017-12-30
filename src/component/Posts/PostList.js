import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import PostItem from "./PostItem";

export default class PostList extends Component
{
    render()
    {

        let keys = Object.keys(this.props.posts);

        return (
            <Grid columns={2} stackable>

                {
                    keys.map(item =>
                    {
                        let post = this.props.posts[item];
                        return (
                            <Grid.Column key={item}>
                                <PostItem
                                    imageUrl={post.photoUrl}
                                    title={post.title}
                                    shortDescription={post.content}
                                    userName={post.userName}
                                    date={post.time}
                                />
                            </Grid.Column>
                        )
                    })
                }
            </Grid>
        )
    }
}