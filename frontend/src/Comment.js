

export default function Comment(){
//     var quill;
// var metaData = [];
// $(document).ready(function() {
//   var toolbarOptions = [
//     ["bold", "italic", "underline", "strike"], // toggled buttons
//     // ['blockquote'],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ script: "sub" }, { script: "super" }], // superscript/subscript
//     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//     [{ direction: "rtl" }], // text direction

//     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],

//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//     [{ font: [] }],
//     [{ align: [] }],

//     ["clean"] // remove formatting button
//   ];
//   quill = new Quill("#snow-container", {
//     placeholder: "Compose an epic...",
//     modules: {
//       toolbar: toolbarOptions
//     },
//     theme: "snow"
//   });
// var oldDelta = {"ops":[{"attributes":{"color":"#000000"},"insert":"This is sample text."}]};
// quill.setContents(oldDelta);
// });

// $(document).on("click", "#comment-button", function() {
//   var prompt = window.prompt("Please enter Comment", "");
//   var txt;
//   if (prompt == null || prompt == "") {
//     txt = "User cancelled the prompt.";
//   } else {
//     var range = quill.getSelection();
//     if (range) {
//       if (range.length == 0) {
//         alert("Please select text", range.index);
//       } else {
//         var text = quill.getText(range.index, range.length);
//         console.log("User has highlighted: ", text);
//         metaData.push({ range: range, comment: prompt });
//         quill.formatText(range.index, range.length, {
//           background: "#fff72b"
//         });
//         drawComments(metaData);
//       }
//     } else {
//       alert("User cursor is not in editor");
//     }
//   }
// });

// function drawComments(metaData) {
//   var $commentContainer = $("#comments-container");
//   var content = "";
//   $.each(metaData, function(index, value) {
//     content +=
//       "<a class='comment-link' href='#' data-index='" +
//       index +
//       "'><li class='list-group-item'>" +
//       value.comment +
//       "</li></a>";
//   });
//   $commentContainer.html(content);
// }

// $(document).on('click','.comment-link',function () {
//             var index = $(this).data('index');
//             console.log("comment link called",index);
//             var data = metaData[index];
//             quill.setSelection(data.range.index, data.range.length);
//         });


//     return <>
//                 <div class="row">
//         <div class="col-md-9">
//             <div class="standalone-container">
//             <div id="custom-toolbar" class="ql-toolbar ql-snow">
//                 <button type="button" id="comment-button" style="width: 60px;color:red"         >Comment</button>
//                 </div>
//             <div id="snow-container"></div>
//             </div>
//         </div>
//         <div class="col-md-3">
//             Comments
//             <ul class="list-group" id="comments-container">
//             </ul>
//         </div>
//         </div>
//     </>
    return <h1>Comment</h1>
}