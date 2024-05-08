import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import {API_URL} from "../myEnv";

export default function EditPost(){

    const {id}=useParams(); 
    const [title, setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [mileage,setMileage]=useState(0);
    const [color,setColor]=useState('');
    const [statu,setStatus]=useState('');
    const [gearbox,setGearbox]=useState('');
    const [cylindrer,setCylindrer]=useState('');
    const [fuel,setFuel]=useState('');
    const [year,setYear]=useState(0);
    const [fiscalPower,setFiscalPower]=useState(0);
    const [cover,setCover]=useState('');
    const [isDeletedPost, setIsDeletedPost] = useState(false);

    //const [cover, setCover]= useState('');
    const [redirect,setRedirect]= useState(false);

    useEffect(()=>{
        fetch(API_URL()+'/post/'+id)
        .then(response =>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setMileage(postInfo.mileage);
                setSummary(postInfo.summary);
                setColor(postInfo.color);
                setStatus(postInfo.status);
                setGearbox(postInfo.gearbox);
                setCylindrer(postInfo.cylindrer);
                setFuel(postInfo.fuel);
                setYear(postInfo.year);
                setFiscalPower(postInfo.fiscalPower);
                setCover(postInfo.cover);
            });
        });
    },[]);

    async function updatePost(ev){
        ev.preventDefault();
        const data= new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('mileage',mileage);
        data.set('statu',statu);
        data.set('color',color);
        data.set('gearbox',gearbox);
        data.set('cylindrer',cylindrer);
        data.set('fuel',fuel);
        data.set('year',year);
        data.set('fiscalPower',fiscalPower);
        data.set('id',id);
        if (cover) {
            data.set('file',cover);
        }

        const response=
        await fetch(API_URL()+'/post',{
           method: 'PUT',
           body:data,
           credentials: 'include',

        });
        if(response.ok){
          setRedirect(true);
        }
    }
    const handleDeletePost =async ()=>{
        const confirmation =window.confirm("Are you sure you want to delete this post?\n");
        if (confirmation){
            const response=
            await fetch(API_URL()+`/deletepost/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
              if (response){
                setIsDeletedPost(true);
                
              }
        }
    }
    const handleFileChange = (event) => {
        setCover(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            // Create a new FileReader instance
            const reader = new FileReader();
            // Set a callback function to handle the file reading
            reader.onload = () => {
                // Set the data URL as the source of the image
                setFiles(reader.result);
            };
            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    };
    if (isDeletedPost) {
        
        /*<div className="MessageOnDelete">
            Post deleted successfully.
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            
        </div>*/
        window.location.reload();   //it is a
        window.location.href = '/';
    
    }
    if (redirect){ 
        return <Navigate to={'/post/'+id} />
    }

    
    return (
      
        <form onSubmit={updatePost} className="addPaddingTop">
  
            <input type="text" 
                placeholder="New title (if needed)" 
                value={title} 
                onChange={ev =>setTitle(ev.target.value)} /> 
            <input type="text" 
                placeholder="New summary (if needed)" 
                value={summary}
                onChange={ev => setSummary(ev.target.value)}/> 
            { !files &&
            <div className="SmallImageEditPage">
                <img src={`${API_URL()}/${cover}`} alt="car image"/>
            </div>
            }
            { files &&
            <div className="SmallImageEditPage">
                <img src={files} alt="car image"/>
            </div>
            }
            <input type="file" name="file"
                onChange={handleFileChange}
                />
            <div className="formContainer">
        
                <p className="optionsOfCreatePost">Other options</p>
            
                <div className="inputWithSuffix">
                    <input  type="number" 
                            id="mileage" 
                            name="mileage" 
                            className="formInput" 
                            required
                            onChange={ev=>setMileage(ev.target.value)}
                            value={mileage}
                            />
                    <span className="suffix">Mileage* (10³ km)</span>
                </div>
                
                <select id="color" 
                        name="color" 
                        className="formInput" 
                        value={color?color:''}
                        onChange={ev=>setColor(ev.target.value)}
                        required>
                  <option value="" disabled selected hidden>&#127912; Color*</option>
                  <option value="Red">&#x1F534;	Red</option>
                  <option value="Blue">&#x1F535; Blue</option>
                  <option value="White">&#x26AA; White</option>
                  <option value="Black">&#x26AB; Black</option>
                  <option value="Yellow">&#x1F7E1; Yellow</option>
                  <option value="Brown">&#x1F7E4; Brown</option>
                  <option value="Gray">&#x26AA; Gray</option>
                  <option value="Green">&#x1F7E2; Green</option>
                  <option value="Other">&#x1F251; Other</option>
            
                </select>
            
                <select id="status" 
                        name="status" 
                        value={statu?statu:''}
                        className="formInput"
                        onChange={ev=>setStatus(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x1F50E; Status</option>
                  <option value="new">&#x1F31F; New</option>
                  <option value="used">&#x2B50;	Used</option>
                </select>
            
                <select id="box" 
                        name="box" 
                        value={gearbox?gearbox:''}
                        className="formInput"
                        onChange={ev=>setGearbox(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x1F579; Gearbox</option>
                  <option value="Manual">&#10001;  Manual</option>
                  <option value="Automatic">&#9861;  Automatic</option>
                </select>
            
                <select id="cylindrer" 
                        name="cylindrer" 
                        value={cylindrer?cylindrer:''}
                        className="formInput"
                        onChange={ev=>setCylindrer(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x1F6E2; Cylindrer</option>
                  <option value="0.5">&le; 0.5L</option>
                  <option value="1.0">1.0L</option>
                  <option value="1.5">1.5L</option>
                  <option value="2.0">2.0L</option>
                  <option value="2.5">2.5L</option>
                  <option value="3.0">3.0L</option>
                  <option value="3.5">3.5L</option>
                  <option value="4.0">&ge; 4.0L</option>   
                </select>
            
                <select id="fuel" 
                        name="fuel" 
                        value={fuel?fuel:''}
                        className="formInput"
                        onChange={ev=>setFuel(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x26FD; Fuel</option>
                  <option value="Gasoline">&#9871; Gasoline</option>
                  <option value="Diesel">&#9870; Diesel</option>
                  <option value="Electric">&#9869; Electric</option>
                  <option value="Hybrid">&#9868; Hybrid</option>
                </select>
            
                <div className="inputWithSuffix">
                    <input type="number" 
                           id="year" 
                           name="year" 
                           value={year}
                           className="formInput" 
                           onChange={ev=>setYear(ev.target.value)}
                           />
                    <span className="suffix">Year</span>
                </div>
            
                <div className="inputWithSuffix">
                    <input type="number" 
                           id="fiscal_power" 
                           name="fiscal_power"
                           value={fiscalPower } 
                           className="formInput" 
                           onChange={ev=>setFiscalPower(ev.target.value)}/>
                    <span className="suffix">Fiscal Power</span>
                </div>
            
            </div>
           <Editor onChange={setContent} value={content}/>
            <button style={{marginTop:'50px'}}>Update Post</button>
            <div> 
                <button className="deleteButton" onClick={handleDeletePost} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                    Delete this post
                </button>
            </div>
        </form>
        
    );
}

