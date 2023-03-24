import React from 'react'
import { useCallback, useEffect, useState, useRef, } from 'react'
import { useParams } from 'react-router-dom';
import { Quill } from "react-quill";
import "quill/dist/quill.snow.css"
import Comments from './Comments';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

export default function Editor() {
  const quillRef = useRef(null);
  const { id: documentID } = useParams();
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (quill == null) return;
    fetchAndSetDocument();
    quill.enable();
  }, [quill])

  const fetchAndSetDocument = async () => {
    const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`);
    const data = await document.json();
    quill.setContents(data);
  }

  const saveDocument = async () => {
    const contents = quill.getContents();
    console.log(JSON.stringify(contents));
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contents)
    })

    if (response.status != 200) {
      console.log(response.error);
    }
  }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ' '
    const editor = document.createElement('div')
    wrapper.append(editor)

    const q = new Quill(editor, {
      ref: { quillRef }, theme: "snow",
      modules: {
        toolbar:
        {
          container: [

            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            ["image", "blockquote", "code-block"],
            ["clean"],
          ],
        }
      }
    })

    q.disable();
    q.setText("Loading...")
    setQuill(q)
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div className="nav-buttons">
        <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
        <button className='btn btn-success'>  Submit  </button>
      </div>            
      <button onClick={saveDocument}>Save</button>
      <div className="container" ref={wrapperRef}>
      </div>
      {
        quill &&
        <Comments documentID={documentID} quill={quill} quillRef = {quillRef}/>
      }
    </>
  );
};
