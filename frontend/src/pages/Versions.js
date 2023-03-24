import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Versions() {
    return (
        <>
            <div className="nav-buttons">
                <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
                <button className='btn btn-success'>  Submit  </button>
            </div>
        </>);
}

export default Versions;