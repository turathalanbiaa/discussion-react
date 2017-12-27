import React , {Component} from 'react';
import {Card , Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class SectionCard extends Component
{

    render()
    {
        return (
            <Card style={{margin : 'auto'}}>
                <Link to={this.props.href}>
                    <Image src={'/images/' + this.props.image}/>
                </Link>
            </Card>
        )
    }

}