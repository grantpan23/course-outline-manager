import React from 'react';
import { Link } from "react-router-dom";



function Print() {

  function printPage() {
    window.print();
  }
    return (
        <button onClick={printPage}>
          Print
        </button>
      );
}

export default Print;


