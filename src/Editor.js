import ReactQuill from "react-quill";


export default function Editor({value,onChange}){

    const modules={
        toolbar:[
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
            ['bold', 'italic', 'underline'],        
            ['link', 'image'],
          
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          
          
            [{ 'color': [] }, { 'background': [] }],         
            [{ 'align': [] }],
          
            ['clean']                                        
          ]
    };
    
    return (
        <ReactQuill value={value} 
        modules={modules} 
       // formats={formats}
       className="react-quill" 
       onChange={onChange}/>
        
    );
}

