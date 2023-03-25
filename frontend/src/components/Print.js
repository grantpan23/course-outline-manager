import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import  Editor  from './Editor';
import q from './Editor';
import {QuillDeltaToHtmlConverter } from 'quill-delta-to-html'




function Print({}) {


  const  printPage = async() =>{
    const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${q.documentID}`);
    const data = await document.json(); 
    console.log(data)
    let data2 = data.ops
    console.log(data2)
    var cfg = {};

var converter = new QuillDeltaToHtmlConverter(data2, cfg);

var html = converter.convert(); 
    let stringData =html
    console.log(stringData)

    var newWindow = window.open();
    console.log(stringData)

    newWindow.document.write(stringData);
    window.onafterprint = event => {
      console.log('after print');
    };
    newWindow.print();
  }
    return (
        <button onClick={printPage}>
          Print
        </button>
      );
}


export default Print;


