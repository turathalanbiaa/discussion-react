import React , {Component} from 'react';
import {Header , Image , Divider} from 'semantic-ui-react';

export default class Post extends Component
{


    render()
    {
        return (
            <div id={this.props.post.id}>

                <div>
                    <Header as='h2'>
                        <Image circular src={parseInt(this.props.post.gender) === 2 ? '/images/woman.png' : '/images/man.png'} />
                        {' '}{this.props.post.userDisplayName}
                    </Header>
                </div>

                <Header as={'h1'}>{this.props.post.title}</Header>

                <Divider/>

                {this.props.post.photoUrl && <Image size={'huge'} src={this.props.post.photoUrl}/>}

                <Divider hidden/>

                <div style={{padding : '20px 0'}} dangerouslySetInnerHTML={{__html: this.props.post.content}}/>

            </div>
        )
    }

}