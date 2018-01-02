import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import firebase from './../Firebase';
import FirebaseUtils from "../utils/FirebaseUtils";
import {Divider, Form, Header, List, Loader, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs'

export default class EditPostPage extends Component
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
            errorMessages: [] ,
            post : {},
            loading : false
        };
    }

    componentDidMount()
    {
        this.loadPost(this.props.postId);
    }

    loadPost = (id) =>
    {
        this.setState({loading: true});

        this.detach();
        this.postRef = firebase.database().ref().child("posts/" + id);
        this.postRef.once("value", snap =>
        {
            let post = snap.val();
            if (post === null)
            {
                this.setState({post: {}, loading: false});
                return;
            }

            this.setState({post: snap.val(), loading: false} , this.setupInputs);
        });
    };

    setupInputs = () =>
    {
        const contentBlock = htmlToDraft(this.state.post.content);
        if (contentBlock)
        {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({editorState : editorState});
        }

        let title = this.state.post.title;
        this.setState({title: title});
    };

    detach = () =>
    {
        if (this.postRef !== null && this.postRef !== undefined)
        {
            this.postRef.off();
        }
    };

    componentWillUnmount()
    {
        this.detach();
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
                    <a className="ui blue large button" onClick={() => window.history.back()}>رجوع</a>
                </div>

                <Header as={"h2"}>تعديل المنشور</Header>

                <Segment className="pageSegment" style={{minHeight: '500px'}}>
                    {
                        !this.props.loading && Object.keys(this.state.post).length > 0 ?
                            this.renderEditPage()
                            :
                            <Loader active/>
                    }
                </Segment>

            </div>
        )
    }

    renderEditPage()
    {
        return (
            <div>
                <Divider hidden/>

                <Form>

                    <Form.Field>
                        <label>عنوان المنشور</label>
                        <input ref={ref => this.titleInputRef = ref} type="text"
                               value={this.state.title}
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
                            style={{background: '#F0A32F', width: '128px'}}
                            className={"ui large button " + (this.state.processing ? 'disabled loading' : '')}
                            onClick={this.save}>تعديل
                        </button>
                    </Form.Field>


                </Form>

                <Divider hidden/>

            </div>
        )
    }

    validate = () =>
    {
        let title = this.state.title;
        let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

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
            this.setState({processing : true});
            let user = await FirebaseUtils.getCurrentUser();

            let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

            let post = {
                title: this.state.title,
                content: content,
                photoUrl: null,
                gender: user.gender,
                type: this.state.post.type,
                level: user.level,
                userId: user.uid,
                userDisplayName: user.name,
                time: firebase.database.ServerValue.TIMESTAMP,
                type_gender: this.state.post.type + "_" + user.gender
            };

            if (!this.state.file && this.state.post.photoUrl)
            {
                post.photoUrl = this.state.post.photoUrl;
            }

            let newPost = firebase.database().ref().child("posts/" + this.props.postId);
            await newPost.set(post);

            if (this.state.file)
            {
                this.uploadFile(this.props.postId);
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
        window.location="/posts/" + this.props.postId;
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
