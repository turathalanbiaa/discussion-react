import React, {Component} from 'react';
import {BrowserRouter , Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginOrCreateFirebaseUser} from "../data/actions/manageUser";
import Logging from "../component/Layout/Logging";
import AllRoutes from "../component/Layout/AllRoutes";
import {Header , Image , Container , Divider , Segment} from 'semantic-ui-react';
import ErrorLogin from "../component/Layout/ErrorLogin";


class RouterPage extends Component
{

    componentDidMount()
    {
        this.props.dispatch(loginOrCreateFirebaseUser());
    }


    render()
    {
        return (
            <BrowserRouter>

                <div style={{marginBottom : '40px'}}>

                    <div style={styles.mainHeader}>
                        <Header as='h2' inverted>
                            <Image src='/images/logo.png' />
                            {' '}مباحثات طلابية
                        </Header>
                    </div>

                    <Container className="noMargin">

                        {
                            this.props.firebaseError ?
                                <ErrorLogin/>
                                :
                                this.props.firebaseLogin ?  <AllRoutes/> : <Logging/>
                        }

                    </Container>

                </div>

            </BrowserRouter>
        )
    }
}

const styles = {
    mainHeader: {
        backgroundColor: '#30499B',
        padding: '20px',
        marginBottom: '30px',
        textAlign: 'right'
    }
};

export default connect((store) =>
{
    return {
        firebaseLogin : store.user.isLogin ,
        firebaseUser : store.user.user ,
        firebaseProcessing : store.user.processing ,
        firebaseError : store.user.error
    }
})(RouterPage)
