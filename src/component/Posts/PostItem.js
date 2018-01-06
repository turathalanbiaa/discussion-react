import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class PostItem extends Component
{

    render()
    {
        return (
            <Link to={"/posts/" + this.props.sectionId + "/" + this.props.gender + "/" + this.props.id}>
                <div style={styles.card}>
                    <div style={styles.imageContainer}>
                        <img style={styles.image} src={this.props.imageUrl ? this.props.imageUrl : "/images/no_image.jpg"}/>
                    </div>
                    <div style={styles.content}>
                        <Header className="three-line" size={'medium'}>{this.props.title}</Header>
                        <div>
                            <div style={styles.contentFooter}>
                                <div style={styles.leftFooterItem}>{this.props.userName ? this.props.userName : 'الاسم غير معروف'}</div>
                                <div style={styles.rightFooterItem}>{this.timestampToDate(this.props.date)}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        )
    }

    timestampToDate = (timestamp) =>
    {
        let a = new Date(timestamp);
        //let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = a.getMonth() + 1;   //months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        //let sec = a.getSeconds();
        return year + '-' + month + '-' + date + ' ' + hour + ':' + min;

    }

}


const styles = {
    card: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '3px',
        height: '128px' ,
        color : 'black'
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%' ,
        border: '1px #EFEFEF solid'
    },
    content: {
        flex: 2,
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent : 'space-between'
    },
    contentFooter: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginTop : '8px'
    },
    rightFooterItem: {
        flex: 0.5,
        margin: 0,
        alignSelf: 'flex-end',
        textAlign : 'left',
        direction : 'ltr'
    },
    leftFooterItem: {
        flex: 0.5,
        margin: 0,
        alignSelf: 'flex-start',
        textAlign : 'right' ,
    }
};