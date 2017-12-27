import React, {Component} from 'react';
import {Image, Header} from 'semantic-ui-react';

export default class Logging extends Component
{

    render()
    {
        return (
            <div style={styles.mainStyle}>

                <Image size={'small'} src="/images/loading_1.gif"/>
                <Header size={'medium'}>جاري تسجيل الدخول</Header>

            </div>
        )
    }

}

const styles = {
    mainStyle: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding : '24px',
        flexDirection: 'column',
        height: '100%'
    }
};