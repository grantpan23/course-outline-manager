import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";

export default function Comment(props) {
    // const [commentQuill, setCommentQuill] = useState(null);
    const [metaData, setMetaData] = useState([]);

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
    const handleSaveButtonClick = (event) => {
        alert("save version")
    }

    return <>
        <div className="row">
            <div className="col-md-9">
                <div className="standalone-container">
                    {/* COMMENT / JUSTIFICATION */}
                    <div id="custom-toolbar" className="ql-toolbar ql-snow">
                        <button type="button" id="comment-button" onClick={handleCommentButtonClick} style={{ width: '60px', color: 'red' }}>Comment</button>
                    </div>

                    {/* SAVE VERSION */}
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