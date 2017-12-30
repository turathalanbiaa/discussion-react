import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';

export default class PostItem extends Component
{

    render()
    {
        return (
            <a href="/posts">
                <div style={styles.card}>
                    <div style={styles.imageContainer}>
                        <img style={styles.image} src={this.props.imageUrl}/>
                    </div>
                    <div style={styles.content}>
                        <Header className="three-line" size={'small'}>{this.props.title}</Header>
                        <div>
                            <div style={styles.contentFooter}>
                                <div style={styles.leftFooterItem}>{this.props.userName}</div>
                                <div style={styles.rightFooterItem}>{this.props.date}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </a>
        )
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
    },
    leftFooterItem: {
        flex: 0.5,
        margin: 0,
        alignSelf: 'flex-start',
        textAlign : 'right'
    }
};