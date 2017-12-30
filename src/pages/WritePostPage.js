import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import firebase from './../Firebase';
import FirebaseUtils from "../utils/FirebaseUtils";
import {Form, List, Segment} from 'semantic-ui-react';

export default class WritePostPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            content: '',
            title: '',
            file: null,
            fileUploadState: null,
            processing: false,
            error: false,
            errorMessages: []
        };
    }

    onEditorStateChange = (editorState) =>
    {
        let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({content: content, editorState: editorState});
    };

    onTitleChanged = (event) =>
    {
        this.setState({title: event.target.value});
    };

    onFileChanged = (event) =>
    {
        if (event.target.files.length > 0)
        {
            let file = event.target.files[0];
            this.setState({file: file});
        }
        else
        {
            this.setState({file: null});
        }
    };

    render()
    {
        return (
            <Segment style={{minHeight: '500px'}}>

                <Form>

                    <Form.Field>
                        <label>عنوان المنشور</label>
                        <input ref={ref => this.titleInputRef = ref} type="text" onChange={this.onTitleChanged}/>
                    </Form.Field>


                    <Form.Field>
                        <label>المحتوى</label>
                        <Editor
                            editorState={this.state.editorState}
                            editorClassName="editor-class"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>ارفق صورة (اختياري)</label>
                        <input ref={ref => this.fileInputRef = ref} type="file" onChange={this.onFileChanged}/>
                    </Form.Field>

                    {
                        this.state.error &&
                        <Segment color={'red'} inverted>
                            <List bulleted>
                                {
                                    this.state.errorMessages.map((item, index) => <List.Item
                                        key={index}>{item}</List.Item>)
                                }
                                {this.state.fileUploadState === "error" &&
                                <List.Item key="file-upload-error-key">{'حصلت مشكلة خلال عملية رفع الملف'}</List.Item>}
                            </List>
                        </Segment>

                    }

                    <Form.Field>
                        <button
                            className={"ui large violet button " + (this.state.processing ? 'disabled loading' : '')}
                            onClick={this.save}>انشر
                        </button>
                    </Form.Field>


                </Form>

            </Segment>
        )
    }

    validate = () =>
    {
        let title = this.state.title;
        let content = this.state.content;

        let messages = [];
        let error = false;

        if (title.trim().length === 0)
        {
            error = true;
            messages.push('عنوان المنشور فارغ')
        }

        if (content.trim().length === 0)
        {
            error = true;
            messages.push('المحتوى فارغ');
        }

        this.setState({error: error, errorMessages: messages});

        return !error;
    };

    save = () =>
    {
        if (!this.validate())
        {
            return;
        }

        this.savePostToDB();
    };

    async savePostToDB()
    {
        try
        {
            this.setState({processing: true});
            let user = await FirebaseUtils.getCurrentUser();

            let post = {
                title: this.state.title,
                content: this.state.content,
                photoUrl: null,
                gender: user.gender,
                type: this.props.sectionId,
                level: user.level,
                userId: user.uid,
                userDisplayName: user.displayName,
                time: firebase.database.ServerValue.TIMESTAMP
            };

            let newPost = firebase.database().ref().child("posts").push();
            await newPost.set(post);

            if (this.state.file)
            {
                this.uploadFile(newPost.key);
            }
            else
            {
                this.savingDone();
            }


        }
        catch (e)
        {
            this.setState({
                fileUploadState: 'error',
                error: true,
                errorMessages: ['حصلت مشكلة خلال عملية النشر'],
                processing: false
            });
        }

    }


    savingDone = () =>
    {
        this.setState({processing: false, editorState: null});
        this.titleInputRef.value = "";
        this.fileInputRef.value = null;
    };

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
                self.setState({fileUploadState: 'error', error: true, processing: false});
                firebase.database().ref().child("posts/" + postKey).set({});
            },

            function complete()
            {
                self.savingDone();
                let downloadUrl = task.snapshot.downloadURL;
                firebase.database().ref().child(`posts/${postKey}/photoUrl`).set(downloadUrl);
                self.setState({fileUploadState: 'done', error: false, processing: false});
            }
        )
    }

}