import React, {Component} from 'react';
import {Segment, Grid, Divider,Loader} from 'semantic-ui-react';
import SectionCard from "../component/SectionCard";
import {Link} from 'react-router-dom';
import FirebaseUtils from "../utils/FirebaseUtils";

export default class Home extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {user : null};
    }

    componentDidMount()
    {
        FirebaseUtils.getCurrentUser().then(user => this.setState({user : user}));
    }

    render()
    {
        return (
            <div>

                <Segment className="noSegment" style={{minHeight: '500px'}}>

                    <Divider hidden/>

                    {
                        this.state.user ?
                            <Grid stackable columns={3} textAlign={'center'}>

                                {
                                    parseInt(this.state.user.gender) === 1 &&
                                    <Grid.Column textAlign="center">
                                        <SectionCard href="/section/1" image="section_1.jpg"/>
                                    </Grid.Column>
                                }

                                {
                                    parseInt(this.state.user.gender) === 2 &&
                                    <Grid.Column textAlign="center">
                                        <SectionCard href="/section/2" image="section_2.jpg"/>
                                    </Grid.Column>
                                }

                                {
                                    parseInt(this.state.user.gender) === 2 &&
                                    <Grid.Column textAlign="center">
                                        <SectionCard href="/section/3" image="section_3.jpg"/>
                                    </Grid.Column>
                                }

                                <Grid.Column textAlign="center">
                                    <SectionCard href="/section/4" image="section_4.jpg"/>
                                </Grid.Column>

                                <Grid.Column textAlign="center">
                                    <SectionCard href="/section/5" image="section_5.jpg"/>
                                </Grid.Column>

                                <Grid.Column textAlign="center">
                                    <SectionCard href="/section/6" image="section_6.jpg"/>
                                </Grid.Column>

                                <Grid.Column textAlign="center">
                                    <SectionCard href="/section/7" image="section_7.jpg"/>
                                </Grid.Column>

                            </Grid>
                            :
                            <Loader active/>
                    }

                    <Divider hidden/>


                </Segment>

            </div>
        )
    }

}