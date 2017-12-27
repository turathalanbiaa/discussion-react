import React, {Component} from 'react';
import {Segment, Grid, Divider} from 'semantic-ui-react';
import SectionCard from "../component/SectionCard";


export default class Home extends Component
{

    render()
    {
        return (
            <div>

                <Segment style={{minHeight : '500px'}}>

                    <Divider hidden/>

                    <Grid stackable columns={3} textAlign={'center'}>

                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/1" image="section_1.jpg"/>
                        </Grid.Column>

                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/2" image="section_1.jpg"/>
                        </Grid.Column>


                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/3" image="section_1.jpg"/>
                        </Grid.Column>

                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/4" image="section_1.jpg"/>
                        </Grid.Column>

                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/5" image="section_1.jpg"/>
                        </Grid.Column>

                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/6" image="section_1.jpg"/>
                        </Grid.Column>

                        <Grid.Column textAlign="center">
                            <SectionCard href="/section/7" image="section_1.jpg"/>
                        </Grid.Column>

                    </Grid>


                </Segment>

            </div>
        )
    }

}