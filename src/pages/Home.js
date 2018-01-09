import React, {Component} from 'react';
import {Divider, Grid, Loader, Segment} from 'semantic-ui-react';
import FirebaseUtils from "../utils/FirebaseUtils";
import HomeItem from "../component/HomeItem";

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
                            <Grid stackable columns={1}>

                                {
                                    (this.state.user && this.state.user.gender === "1") &&
                                    <Grid.Column>
                                        <HomeItem title="القسم الرجالي" subtitle="المنتدى الاداري" sectionId="section/1"/>
                                    </Grid.Column>
                                }


                                {
                                    (this.state.user && this.state.user.gender === "2") &&
                                    <Grid.Column>
                                        <HomeItem title="القسم النسوي / الهيئة الادارية" subtitle="المنتدى الاداري" sectionId="section/2"/>
                                    </Grid.Column>
                                }

                                {
                                    (this.state.user && this.state.user.gender === "2") &&
                                    <Grid.Column>
                                        <HomeItem title="القسم النسوي / الهيئة العلمية" subtitle="المنتدى الاداري" sectionId="section/3"/>
                                    </Grid.Column>
                                }

                                <Grid.Column>
                                    <HomeItem title="مباحثات الفقه" subtitle="المرحلة التمهيدية" sectionId="section/4"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات العقائد" subtitle="المرحلة التمهيدية" sectionId="section/5"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات النحو" subtitle="المرحلة التمهيدية" sectionId="section/6"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات المنطق" subtitle="المرحلة التمهيدية" sectionId="section/7"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات احكام التجويد" subtitle="المرحلة التمهيدية" sectionId="section/8"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات الفقه" subtitle="مقدمات اولى" sectionId="section/9"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات العقائد" subtitle="مقدمات اولى" sectionId="section/10"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات النحو" subtitle="مقدمات اولى" sectionId="section/11"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات المنطق" subtitle="مقدمات اولى" sectionId="section/12"/>
                                </Grid.Column>


                                <Grid.Column>
                                    <HomeItem title="مباحثات الفقه" subtitle="مقدمات ثانية" sectionId="section/13"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات العقائد" subtitle="مقدمات ثانية" sectionId="section/14"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات النحو" subtitle="مقدمات ثانية" sectionId="section/15"/>
                                </Grid.Column>

                                <Grid.Column>
                                    <HomeItem title="مباحثات المنطق" subtitle="مقدمات ثانية" sectionId="section/16"/>
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