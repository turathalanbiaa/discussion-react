import React , {Component} from 'react';
import {Segment , Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class HomeItem extends Component
{

    render()
    {
        return (
            <Link to={'/' + this.props.sectionId}>
                <Segment>
                    <Header size={'large'}>{this.props.title}</Header>
                    <Header size={'small'}>{this.props.subtitle}</Header>
                </Segment>
            </Link>
        )
    }

}