import React from 'react'
import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from "react-quill-with-table";
import "quill/dist/quill.snow.css"
import {io} from 'socket.io-client'
import Comment from './Comment';
<<<<<<< HEAD
// import {drawComments} from './Comment';
=======
// import * as quillBetterTable from 'quill-better-table';
import "react-quill-with-table/dist/quill.snow.css";
// import "quill-better-table/dist/quill-better-table.css";
>>>>>>> 565d5989cb61dccf6c98074dc60e478b6c667a08


// Quill.register({
//       'modules/better-table': quillBetterTable
//     }, true);


const SAVE_INTERVAL_MS =2000;

export default function Editor(){
    const reactQuillRef = useRef(null); 
    const {id: documentId} = useParams();
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    console.log(documentId);

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

<<<<<<< HEAD
        socket.on("load-document", (documentData) => {
            // drawComments(documentData.metadata);
            // console.log(documentData.metadata);
          });

=======
>>>>>>> 565d5989cb61dccf6c98074dc60e478b6c667a08
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
            table: true,
            // 'better-table': {
            //     operationMenu: {
            //       items: {
            //         unmergeCells: {
            //           text: 'Another unmerge cells name'
            //         }
            //       }
            //  }
            // },
            // keyboard: {
            //     bindings: quillBetterTable.keyboardBindings
            // },
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
                    ['table'],
                ],
                //    handlers: {
                //       'tableD': () => {
                //         const t = q.getModule('better-table')
                //         t.insertTable(3,3)
                //         console.log('click')
                //         console.log(t)
                //       }
                //     }
            
        }
        } })
        
    

        //const tableButton = document.createElement('button')
        
        q.disable();
        q.setText("Loading...")
        setQuill(q)
    }, [])

    return <>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js" type="text/javascript"></script>
        <Comment quill={quill}/>
        <div className="container" ref = {wrapperRef}>
        </div>
        
    
    </> 
}
