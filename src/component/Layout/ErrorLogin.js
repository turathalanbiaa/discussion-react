import React, {Component} from 'react';
import {Button, Header, Image} from 'semantic-ui-react';

export default class ErrorLogin extends Component
{

    render()
    {
        return (
            <div style={styles.mainStyle}>

                <Image size={'tiny'} src="/images/error.png"/>
                <Header size={'large'}>يجب عليك تسجيل الدخول اولا</Header>
                <Button href="http://turathalanbiaa.com/login" size={'large'} color={'teal'}>تسجيل الدخول</Button>

            </div>
        )
    }

}

const styles = {
    mainStyle: {
        display: 'flex',
        flex: 1,
        padding : '24px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    }
};