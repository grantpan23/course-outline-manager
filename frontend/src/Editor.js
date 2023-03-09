import React from 'react'
import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from "react-quill-with-table";
import "quill/dist/quill.snow.css"
import {io} from 'socket.io-client'
import Comment from './Comment';
import QuillBetterTable from "quill-better-table";
import "react-quill-with-table/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";

Quill.register({ "modules/better-table": QuillBetterTable });

const SAVE_INTERVAL_MS =2000;
const TOOLBAR_OPTIONS = [
 [{header :[1,2,3,4,5,6,false]}],
 [{font: []}],
 [{list: "ordered"}, {list: "bullet"}],
 ["bold", "italic", "underline"],
 [ {color :[] }, {background: [] }],
 [{script : "sub"}, {script : "super"}],
 [{align : []}],
 ["image", "blockquote", "code-block"],
 ["clean"],

 ,
]

export default function Editor(){
    const reactQuillRef = useRef(null); 
    const {id: documentId} = useParams();
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    console.log(documentId);

    //whenever we call the insert table function we are using the insert table method provided by quill libary and applying it to this editor
    const insertTable = () => {
        const editor = wrapperRef.current.getEditor();
        const tableModule = editor.getModule("better-table");
        tableModule.insertTable(3, 3);
      };

    
// this is not working rn, but I'll try and fix it for a later sprint -Tife
    // useEffect(() => {
    //     const editor = reactQuillRef.current.getEditor();
    //     const toolbar = editor.getModule("toolbar");
    //     toolbar.addHandler("table", () => {
    //       insertTable(); // when we click table button on the toolbar, overide current behaviour with that specified in the provided function
    //     });
    // }, []);

    useEffect(() => {
        const s = (io("http://localhost:4000"))
        setSocket(s)
        return () => {
            s.disconnect()

        }

    }, [])

    //sending text
    useEffect(() => {

        if ( socket == null || quill == null) return

        const handler  = (delta, oldDelta, source) => {
            if (source !== 'user') return 
            socket.emit("send-changes", delta)
        }
        quill.on('text-change', handler)

        return() => {
            quill.off('text-change', handler)
        }

    }, [socket,quill])

    //receiving text 
    useEffect(() => {

        if ( socket == null || quill == null) return

        const handler  = (delta, oldDelta, source) => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler)

        return() => {
            socket.off('text-changes', handler)
        }

    }, [socket,quill])

    useEffect(() => {
        if (socket == null || quill == null) return 

        socket.once("load-document",document => { 
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document', documentId)

    },[socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null) return 

        const interval = setInterval(() => {

            socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)

        
        return () => {
            clearInterval(interval)
        }

    },[socket, quill])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return

        wrapper.innerHTML = ' '
        const editor = document.createElement('div')
        wrapper.append(editor)

        
        const q = new Quill(editor, { ref: {reactQuillRef}, theme : "snow", 
        modules:{
            table: false,
            'better-table': {
                operationMenu: {
                  items: {
                    unmergeCells: {
                      text: 'Another unmerge cells name'
                    }
                  }
             }
            },
            toolbar : 
            {
                container: [
                    ['table'],
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
                   handlers: {
                      'table': () => this.tableTable()
                    }
            
        }
        } })

        const tableTable = () => {
            console.log(q.getModule('better-table'))
            const table = q.getModule('better-table')
            table.insertTable(2, 2);
        }

        

        //const tableButton = document.createElement('button')
        
        q.disable();
        q.setText("Loading...")
        setQuill(q)
    }, [])

    const modules = useMemo(
        () => ({
          table: false,
          "better-table": {
            operationMenu: {
              items: {
                unmergeCells: {
                  text: "Another unmerge cells name"
                }
              }
            }
          },
          keyboard: {
            bindings: QuillBetterTable.keyboardBindings
          },
          toolbar: TOOLBAR_OPTIONS
        }),
        []
      );
    return <>
        <Comment quill={quill}/>
        <div className="container" ref = {wrapperRef}>
       
        </div>
    </> 
}
