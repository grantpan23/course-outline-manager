import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'

export default function CreateBlankOutline(){

    const navigate = useNavigate
    useEffect(() => {

      
            navigate(`/documents/${uuidv4()}`)

    }, [])
    
// add print functionality
    return <h1>Redirect</h1>
}
