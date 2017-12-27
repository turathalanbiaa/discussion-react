import React , {Component} from 'react';
import {Header} from 'semantic-ui-react';

export default class PostItem extends Component
{

    render()
    {
        return (
            <div style={styles.card}>
                <div style={styles.image}>
                    <img style={styles.image} src={this.props.imageUrl}/>
                </div>
                <div style={styles.content}>
                    <Header size={'small'}>{this.props.title}</Header>
                    <p>{this.props.shortDescription}</p>
                    <div>
                        <p>{this.props.userName}</p>
                        <p>{this.props.date}</p>
                    </div>
                </div>
            </div>
        )
    }

}


const styles = {
    card : {
        backgroundColor : '#FFFFFF' ,
        boxShadow : '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5',
        display : 'flex' ,
        flex : 0.45 ,
        flexDirection : 'row' ,
    },
    image : {
        flex : 1,
        height : '100%',
        width : '100%'
    },
    content : {
        flex : 2,
        display : 'flex',
        flexDirection:'column'
    }
};