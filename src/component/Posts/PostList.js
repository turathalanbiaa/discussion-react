import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import PostItem from "./PostItem";

export default class PostList extends Component
{
    render()
    {

        let keys = Object.keys(this.props.posts);
        keys = keys.reverse();
        return (
            <Grid columns={2} stackable>

                {
                    keys.map(item =>
                    {
                        let post = this.props.posts[item];
                        return (
                            <Grid.Column key={item}>
                                <PostItem
                                    id={item}
                                    imageUrl={post.photoUrl}
                                    title={post.title}
                                    shortDescription={post.content}
                                    userName={post.userDisplayName}
                                    gender={post.gender}
                                    sectionId={this.props.sectionId}
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