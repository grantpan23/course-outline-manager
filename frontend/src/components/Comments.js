import { useState, useEffect } from 'react';
import decode from 'jwt-decode';

export default function Comments(props){
    const quill = props.quill;
    const quillRef = props.quillRef;
    const documentID = props.documentID;

    const userInfo = decode(window.localStorage.getItem("token"));

    const [metadata,setMetadata] = useState({});
    const [selection,setSelection] = useState('');
    const [comment,setComment] = useState('');

    useEffect(() => {
        fetchMetadata();
    },[])
    

    quill.on('selection-change', (range) => {
        if(!range) return;
        const text = quill.getText(range.index, range.length);
        setSelection(text);
    })

    const fetchMetadata = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/comments`);

        const data = await response.json();
        console.log(data);
        setMetadata(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username:userInfo.username,
            userRole:userInfo.role,
            commentText:comment,
            selectedText:selection,
        }

        const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(payload)
        })

        const data = await response.json();

        setMetadata(data);
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
        <div>
            
        </div>
    </>
}
