import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import firebase from './../Firebase';
import FirebaseUtils from "../utils/FirebaseUtils";

export default class NewPostPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {content: '', title: '', file: null, fileUploadState: null};
    }

    onEditorStateChange = (editorState) =>
    {
        let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({content: content});
    };

    onTitleChanged = (event) =>
    {
        this.setState({title : event.target.value});
    };

    onFileChanged = (event) =>
    {
        let file = event.target.files[0];
        this.setState({file: file});
    };

    render()
    {
        return (
            <div style={{width: '80%', margin: 'auto'}}>

                <input type="text" onChange={this.onTitleChanged}/>

                <Editor
                    editorClassName="editor-class"
                    onEditorStateChange={this.onEditorStateChange}
                />

                <input type="file" onChange={this.onFileChanged}/>

                <button onClick={this.save}>Save</button>

            </div>
        )
    }

    save = () =>
    {
        this.savePostToDB();
    };

    async savePostToDB()
    {

        try
        {
            let user = await FirebaseUtils.getCurrentUser();
            let post = {
                title: this.state.title,
                content: this.state.content,
                photoUrl: null,
                gender: user.gender,
                type: user.type,
                level: user.level,
                userId: user.uid
            };

            console.log(user , post);

            let newPost = firebase.database().ref().child("posts").push();
            await newPost.set(post);
            this.uploadFile(newPost.key);
        }
        catch (e)
        {
            console.log(e);
        }

    }

    uploadFile = (postKey) =>
    {
        let fileRef = firebase.storage().ref(`posts/${postKey}`);
        let task = fileRef.put(this.state.file);
        let self = this;
        task.on("state_changed",

            function progress(snapshot)
            {
                let ratio = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                self.setState({fileUploadState: ratio});
            },

            function error()
            {
                self.setState({fileUploadState: 'error'});
            },

            function complete()
            {
                let downloadUrl = task.snapshot.downloadURL;
                firebase.database().ref().child(`posts/${postKey}/photoUrl`).set(downloadUrl);
                self.setState({fileUploadState: 'done'});
            }
        )
    }

}