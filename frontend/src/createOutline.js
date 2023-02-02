import { useCallback } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"

export default function createOutline(){
const wrappedRef = useCallback(wrapper => {
    if (wrapper == null) return 

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    new Quill (editor, {theme: "snow"})
       
        } ,[])
    return    
        <div id = "container" ref={wrappedRef}> </div>
    
}
