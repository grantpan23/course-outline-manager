import React from 'react'
import { useCallback, useEffect, useState, useRef, } from 'react'
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from "react-quill";
import "quill/dist/quill.snow.css"
import {io} from 'socket.io-client'
import Comment from './Comment';

const SAVE_INTERVAL_MS =2000;

export default function Editor(){
    const reactQuillRef = useRef(null); 
    const {id: documentID} = useParams();
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(()=>{
      if(quill == null) return;
      fetchAndSetDocument();
      quill.enable();
    },[quill])

    const fetchAndSetDocument = async () => {
      const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`);
      const data = await document.json();
      quill.setContents(data);
    }

    // console.log(documentId);

    
    // useEffect(() => {
    //     const s = (io("http://localhost:4000"))
    //     setSocket(s)
    //     return () => {
    //         s.disconnect()

    //     }

    // }, [])
    // console.log(socket);

    // useEffect(() => {

    //     if ( socket == null || quill == null) return

    //     const handler  = (delta, oldDelta, source) => {
    //         if (source !== 'user') return 
    //         socket.emit("send-changes", delta)
    //     }
    //     quill.on('text-change', handler)

    //     return() => {
    //         quill.off('text-change', handler)
    //     }

    // }, [socket,quill])

    // useEffect(() => {

    //     if ( socket == null || quill == null) return

    //     const handler  = (delta, oldDelta, source) => {
    //         quill.updateContents(delta)
    //     }
    //     socket.on('receive-changes', handler)

    //     return() => {
    //         socket.off('text-changes', handler)
    //     }

    // }, [socket,quill])

    // useEffect(() => {
    //     if (socket == null || quill == null) return 

    //     socket.once("load-document",document => { 
    //         quill.setContents(document)
    //         quill.enable()
    //     })
    //     socket.emit('get-document', documentId)

    // },[socket, quill, documentId])

    // useEffect(() => {
    //     if (socket == null || quill == null) return 

    //     const interval = setInterval(() => {

    //         socket.emit("save-document", quill.getContents())
    //     }, SAVE_INTERVAL_MS)
      
    //     return () => {
    //         clearInterval(interval)
    //     }

    // },[socket, quill])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        wrapper.innerHTML = ' '
        const editor = document.createElement('div')
        wrapper.append(editor)

        const q = new Quill(editor, { ref: {reactQuillRef}, theme : "snow", 
        modules:{
            toolbar : 
            {
                container: [
                     
                    [{header :[1,2,3,4,5,6,false]}],
                    [{font: []}],
                    [{list: "ordered"}, {list: "bullet"}],
                    ["bold", "italic", "underline"],
                    [ {color :[] }, {background: [] }],
                    [{script : "sub"}, {script : "super"}],
                    [{align : []}],
                    ["image", "blockquote", "code-block"],
                    ["clean"], 
                ],
        }
        }})
        
        q.disable();
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return <>
        <Comment quill={quill}/>
        <div className="container" ref = {wrapperRef}>
        </div>
    </> 
}