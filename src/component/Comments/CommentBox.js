import React , {Component} from 'react';
import {Form , Button} from 'semantic-ui-react';
import FirebaseUtils from "../../utils/FirebaseUtils";
import firebase from './../../Firebase';
import {Segment , Header} from 'semantic-ui-react';

export default class CommentBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {comment: '' , processing : false , error : false};
    }

    render()
    {
        firebase.database().ref().child("comments/L1fHWfXEsk9URPkrC-_").set({});

        return (
            <Form reply>
                <Form.TextArea onChange={event => this.setState({comment : event.target.value})} value={this.state.comment}/>
                {
                    this.state.error && <Segment color={'red'} inverted><Header as={'h4'}>حصلت مشكلة خلال ارسال التعليق ، اعد المحاولة بعد قليل</Header></Segment>
                }
                <Button disabled={this.state.processing && !this.state.error}
                        loading={this.state.processing}
                        onClick={this.save} content='اكتب تعليق' labelPosition='right' icon='edit' primary />
            </Form>
        )
    }

    save = async () =>
    {
        if(this.state.comment.trim() === "")
            return;

        this.setState({processing : true});
        try
        {
            let user = await FirebaseUtils.getCurrentUser();
            let comment = firebase.database().ref().child(`comments/${this.props.postId}`).push();
            await comment.set({
                comment: this.state.comment,
                userId: user.uid,
                gender: user.gender,
                userDisplayName : user.name,
                time: firebase.database.ServerValue.TIMESTAMP
            });

            this.setState({processing : false , comment : ''});
        }
        catch (e)
        {
            this.setState({error : true , processing : false});
            setTimeout(() => {
                this.setState({error : false});
            } , 5000)
        }
    }

}

