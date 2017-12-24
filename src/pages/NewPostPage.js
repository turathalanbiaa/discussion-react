import React , {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'

export default class NewPostPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {content : ''};
    }

    onEditorStateChange = (editorState) =>
    {
        let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({content : content});
    };

    render()
    {
        return (
            <div style={{width : '80%' , margin : 'auto'}}>
                <input type="text" />
                <Editor
                    editorClassName="editor-class"
                    onEditorStateChange={this.onEditorStateChange}
                />

                <button onClick={this.save}>Save</button>
            </div>
        )
    }

    save = () =>
    {
        console.log(this.state);
    }

}