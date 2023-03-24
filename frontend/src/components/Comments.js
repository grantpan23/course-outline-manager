import { useState, useEffect } from 'react';

export default function Comments(props){
    const quill = props.quill;
    const quillRef = props.quillRef;
    const documentID = props.documentID;

    const [metaData,setMetaData] = useState([]);
    const [selection,setSelection] = useState('');
    const [comment,setComment] = useState('');
    

    quill.on('selection-change', (range) => {
        if(!range) return;

        const text = quill.getText(range.index, range.length);
        console.log(text);
        setSelection(text);
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(selection + " " + comment)
    }

    return <>
        <div>
            <form>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" name="comment" onChange = {(e) => setComment(e.target.value)}></textarea>
                </label>
                <br/>
                <button onClick = {handleSubmit}>Submit Comment</button>
            </form>
        </div>
    </>
}
