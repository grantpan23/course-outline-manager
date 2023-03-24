import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import  Editor  from './Editor';
import q from './Editor';



function Print({}) {

  function printPage() {
    const 
  
  
    // const quillContent = q;
    // console.log(quillContent)
    // const newWindow = window.open();
    // newWindow.document.write(printDocument);
    // newWindow.print();
  }
    return (
        <button onClick={printPage}>
          Print
        </button>
      );
}


export default Print;


