import React , {Component} from 'react';
import {Header , Image , Divider} from 'semantic-ui-react';
import TimeUtils from "../utils/TimeUtils";

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
                <p style={{direction : 'ltr', textAlign : 'right'}}>{TimeUtils.timestampToDate(this.props.post.time)}</p>

                <Divider/>

                {this.props.post.photoUrl && <Image style={{border : '1px #EEEEEE solid'}} size={'huge'} src={this.props.post.photoUrl}/>}

                <Divider hidden/>

                <div style={{padding : '20px 0'}} dangerouslySetInnerHTML={{__html: this.props.post.content}}/>

            </div>
        )
    }

}