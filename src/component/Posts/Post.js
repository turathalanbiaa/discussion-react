import React , {Component} from 'react';
import {Header , Image , Divider , Button} from 'semantic-ui-react';
import TimeUtils from "../../utils/TimeUtils";
import {Link} from 'react-router-dom';

export default class Post extends Component
{


    render()
    {
        return (
            <div id={this.props.post.id}>

                <div>
                    <Header as='h4'>
                        <Image circular src={parseInt(this.props.post.gender) === 2 ? '/images/woman.png' : '/images/man.png'} />
                        {' '}{this.props.post.userDisplayName}

                        {
                            this.props.canEdit &&
                            <div style={{float : 'left'}}>
                                <Link className="ui yellow button" to={"/post/edit/" + this.props.sectionId + "/" + this.props.gender + "/" + this.props.id} >تعديل</Link>
                                <Button onClick={() => this.props.deleteAction()} color={'red'}>حذف</Button>
                            </div>
                        }

                    </Header>
                </div>

                <Header as={'h1'}>{this.props.post.title}</Header>
                <p style={{direction : 'ltr', textAlign : 'right'}}>{TimeUtils.timestampToDate(this.props.post.time)}</p>

                <Divider/>

                {this.props.post.photoUrl && <Image style={{border : '1px #EEEEEE solid'}} size={'huge'} src={this.props.post.photoUrl}/>}

                <Divider hidden/>

                <div id="htmlContent" style={{padding : '20px 4px'}} dangerouslySetInnerHTML={{__html: this.props.post.content}}/>

            </div>
        )
    }

}