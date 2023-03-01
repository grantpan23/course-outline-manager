import React, { useState, useEffect } from "react";
import Quill from "quill";

export default function Comment(){
    const [quill, setQuill] = useState(null);
    const [metaData, setMetaData] = useState([]);
  
    useEffect(() => {
      const toolbarOptions = [      ["bold", "italic", "underline", "strike"], // toggled buttons
        // ['blockquote'],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
  
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
  
        ["clean"] // remove formatting button
      ];
  
      const newQuill = new Quill("#snow-container", {
        placeholder: "Compose an epic...",
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow"
      });
  
      const oldDelta = {
        ops: [{ attributes: { color: "#000000" }, insert: "This is sample text." }]
      };
      newQuill.setContents(oldDelta);
  
      setQuill(newQuill);
    }, []);
  
    const handleCommentButtonClick = () => {
      const promptText = window.prompt("Please enter Comment", "");
      if (!promptText) {
        console.log("User cancelled the prompt.");
        return;
      }
  
      const range = quill.getSelection();
      if (range) {
        if (range.length === 0) {
          alert("Please select text", range.index);
        } else {
          const text = quill.getText(range.index, range.length);
          console.log("User has highlighted: ", text);
          const newMetaData = [...metaData, { range: range, comment: promptText }];
          setMetaData(newMetaData);
          quill.formatText(range.index, range.length, {
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
          '"><li class="list-group-item">' +
          value.comment +
          "</li></a>";
      });
      commentContainer.innerHTML = content;
    };
  
    const handleCommentLinkClick = (event) => {
      const index = event.target.getAttribute("data-index");
      console.log("comment link called", index);
      const data = metaData[index];
      quill.setSelection(data.range.index, data.range.length);
    };
    
    return <>
        <div className="row">
  <div className="col-md-9">
    <div className="standalone-container">
      <div id="custom-toolbar" className="ql-toolbar ql-snow">
        <button type="button" id="comment-button" style={{width: '60px', color: 'red'}}>Comment</button>
      </div>
      <div id="snow-container"></div>
    </div>
  </div>
  <div className="col-md-3">
    Comments
    <ul className="list-group" id="comments-container">
    </ul>
  </div>
</div>
    </>
}