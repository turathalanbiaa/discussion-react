import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import firebase from './../Firebase';
import FirebaseUtils from "../utils/FirebaseUtils";
import {Form, List, Segment, Divider, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import AppUtils from "../utils/AppUtils";

export default class WritePostPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            title: '',
            file: null,
            fileUploadState: null,
            processing: false,
            error: false,
            errorMessages: []
        };
    }

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
            <div>

                <div>
                    <Link className="ui blue large button" to="/">الرئيسية</Link>
                    <Link className="ui green large button"
                          to={"/section/" + this.props.sectionId}>{AppUtils.sectionIdToTitle(this.props.sectionId)}</Link>
                </div>

                <Header as={"h2"}>كتابة منشور الى : {AppUtils.sectionIdToTitle(this.props.sectionId)}</Header>

                <Segment className="noSegment" style={{minHeight: '500px'}}>

                    <Divider hidden/>

                    <Form>

                        <Form.Field>
                            <label>عنوان المنشور</label>
                            <input ref={ref => this.titleInputRef = ref} type="text"
                                   onChange={event => this.setState({title: event.target.value})}/>
                        </Form.Field>

                        <Form.Field>
                            <label>المحتوى</label>
                            <Editor
                                editorState={this.state.editorState}
                                editorClassName="editor-class"
                                onEditorStateChange={editorState => this.setState({editorState: editorState})}
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
                                    <List.Item
                                        key="file-upload-error-key">{'حصلت مشكلة خلال عملية رفع الملف'}</List.Item>}
                                </List>
                            </Segment>
                        }

                        <Form.Field>
                            <button
                                style={{background : '#F0A32F' , width : '128px'}}
                                className={"ui large button " + (this.state.processing ? 'disabled loading' : '')}
                                onClick={this.save}>انشر
                            </button>
                        </Form.Field>


                    </Form>

                    <Divider hidden/>

                </Segment>
            </div>
        )
    }

    validate = () =>
    {
        let title = this.state.title;
        let content = this.state.editorState ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) : '';

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

            let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

            let post = {
                title: this.state.title,
                content: content,
                photoUrl: null,
                gender: user.gender,
                type: this.props.sectionId,
                level: user.level,
                userId: user.uid,
                userDisplayName: user.name,
                time: firebase.database.ServerValue.TIMESTAMP,
                type_gender : this.props.sectionId + "_" + user.gender
            };

            let postsRef = "posts/" + this.props.sectionId;
            let newPost = firebase.database().ref().child(postsRef).push();
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
        let fileRef = firebase.storage().ref(`posts/${this.props.sectionId}/${postKey}`);
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
                firebase.database().ref().child("posts/" + self.props.sectionId + "/" + postKey).set({});
            },

            function complete()
            {
                self.savingDone();
                let downloadUrl = task.snapshot.downloadURL;
                firebase.database().ref().child(`posts/${self.props.sectionId}/${postKey}/photoUrl`).set(downloadUrl);
                self.setState({fileUploadState: 'done', error: false, processing: false});
            }
        )
    }

}
