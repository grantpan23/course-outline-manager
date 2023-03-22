import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

import {io} from 'socket.io-client'
import Quill from "quill";

export default function Comment(props) {
    const [metaData, setMetaData] = useState([]);
    const {socket} = props;

    const saveEditHistory = async (UID, doc) => {
        const today = new Date()
        const obj = {
            userID: UID,
    timeStamp:today,
    activity: "edited",
    docID: doc
        }
        console.log(obj);
       
          fetch(process.env.REACT_APP_API_URL + `/api/admin/testadmin/activity`, {
            method: 'POST',
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NjQ5NTk0OH0.LIsPjSabAE6o8AMMMpgMl8zDmoV33eJYCYctXH2ZYM0',
              'Content-type': 'application/json'
            
            },
            body: JSON.stringify(obj)
           
          })
          
            .then(async res => {
              if (res.ok) {
                let data = await res.json();
                alert(`recorded save`);
                console.log(data)
              }
            })
        
      };

    const handleCommentButtonClick = () => {
        const promptText = window.prompt("Please enter Comment", "");
        if (!promptText) {
            console.log("User cancelled the prompt.");
            return;
        }

        const range = props.quill.getSelection();
        if (range) {
            if (range.length === 0) {
                alert("Please select text", range.index);
            } else {
                const text = props.quill.getText(range.index, range.length);
                console.log("User has highlighted: ", text);
                const newMetaData = [...metaData, { range: range, comment: promptText }];
                setMetaData(newMetaData);
                props.quill.formatText(range.index, range.length, {
                    background: "#fff72b"
                });
                // highlight
                drawComments(newMetaData);
            }
        } else {
            alert("User cursor is not in editor");
        }
    };

    const drawComments = (metaData) => {
        const commentContainer = document.getElementById("comments-container");
        let content = "";
        metaData.forEach((value, index) => {
            content +=
                '<a class="comment-link" href="#" data-index="' +
                index +
                '" ><li class="list-group-item">' +
                value.comment +
                "</li></a>";
        });
        commentContainer.innerHTML = content;

        const commentLinks = document.querySelectorAll(".list-group-item");
        commentLinks.forEach((link) => {
            link.addEventListener("click", handleCommentLinkClick);
        });
    };

    // THIS CURRENTLY DOES NOT GET SAVED
    // AND CLICK DOES NOT FUNCTION AS WELL
    const handleCommentLinkClick = (event) => {
        const index = event.currentTarget.dataset.index;
        console.log("comment link called", index);
        const data = metaData[index];
        props.quill.setSelection(data.range.index, data.range.length);
    };

    // Save Version
    const handleSaveButtonClick = () => {
        const ops = props.quill.getContents().ops;
        const document = {ops, metadata: metaData}; 
        console.log(document);

        socket.emit("save-document", document)
        // console.log(props.quill.getContents());
        alert("save version")
    }

    return <>
        <div className="row">
            <div className="col-md-9">
                <div className="standalone-container">
                    <div id="custom-toolbar" className="ql-toolbar ql-snow">
                        {/* COMMENT / JUSTIFICATION */}
                        <button type="button" id="comment-button" onClick={handleCommentButtonClick} style={{ width: '60px', color: 'red' }}>Comment</button>
                    </div>

                    {/* SAVE VERSION */}
                    {/* going to combine this button with the submit button */}
                    <button type="button" id="comment-button" onClick={handleSaveButtonClick}>Save Version</button>
                    {/* <div id="snow-container"></div> */}
                </div>
            </div>
            <div className="col-md-2">
                Comments
                <ul className="list-group" id="comments-container">
                </ul>
            </div>
        </div>
    </>
}