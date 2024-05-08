import { useState } from "react";
import ReactQuill from "react-quill";
import {Navigate} from "react-router-dom";
import 'react-quill/dist/quill.snow.css'
import Editor from "../Editor";
import {API_URL} from "../myEnv";



export default function CreatePost() {
    const [title, setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [mileage,setMileage]=useState(0);
    const [color,setColor]=useState('');
    const [statu,setStatus]=useState('');
    const [gearbox,setGearbox]=useState('');
    const [cylindrer,setCylindrer]=useState('');
    const [fuel,setFuel]=useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [fiscalPower,setFiscalPower]=useState(0);
    const [files,setFiles]=useState('');
    const [cover,setCover]=useState('');
    const [isHiddenPost,setIsHiddenPost]=useState(false);
    //const [vues,setVues]=useState(0);
    //const [likes,setLikes]=useState(0);
    //const [whoLikes,setwhoLikes]=useState([]);
    //const [comments,setComments]=useState([]);
    //const [bannedPost,setBannedPost]=useState({});
    const [typeBidding,setTypeBidding]=useState('');
    //const [overbids,setOverbids]=useState([]);
    const [firstPrice,setFirstPrice]=useState(0);
    const [dateBegin,setDateBegin]=useState(new Date);
    const [dateEnd,setDateEnd]=useState(() => {
        const nextMonth = new Date(dateBegin);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth;
      });
    //const [winner,setWinner]=useState('');

    const handleFileChange= (ev)=>{
        setFiles(ev.target.files);
        const file = ev.target.files[0];
        

        if (file) {
            // Create a new FileReader instance
            const reader = new FileReader();
            // Set a callback function to handle the file reading
            reader.onload = () => {
                // Set the data URL as the source of the image
                setCover(reader.result);
            };
            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    };

    const [redirect,setRedirect]= useState(false);

async function createNewPost(ev){
    ev.preventDefault();
    const data= new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    if (files?.[0]) {
        data.set('file',files?.[0]);
    }
    data.set('mileage',mileage);
    data.set('statu',statu);
    data.set('color',color);
    data.set('gearbox',gearbox);
    data.set('cylindrer',cylindrer);
    data.set('fuel',fuel);
    data.set('year',year);
    data.set('fiscalPower',fiscalPower);
    data.set('typeBidding',typeBidding);
    data.set('firstPrice',firstPrice);
    data.set('dateBegin',dateBegin);
    data.set('dateEnd',dateEnd);
    console.log(files)

    const headers = {
        method: 'POST',
        body: data,
        credentials:'include',
    };
    
    try {
        const response = await fetch(API_URL()+'/post', headers);
        if (response.ok){
            setRedirect(true);
        }
        
    } catch (error) {
        console.error('Error CreatePost:', error);
    }
     
     
}

    if (redirect){ 
        return <Navigate to={'/'} />
    }
    return (
      
        <form onSubmit={createNewPost} className="addPaddingTop">
            <h3 className="titleOfCreatePost">Create post</h3>
            <input type="text" 
                placeholder="Model" 
                className="formInput"
                value={title} 
                onChange={ev =>setTitle(ev.target.value)}
                required /> 
            <input type="text" 
                placeholder="Summary" 
                className="formInput"
                value={summary}
                onChange={ev => setSummary(ev.target.value)}
                required/> 
            { cover &&
            <div className="SmallImageEditPage">
                <img src={cover} alt="car image"/>
            </div>
            }
            <input type="file" name="file"
                className="formInput"
                onChange={handleFileChange}
                required/>
            <div className="formContainer">
        
                <p className="optionsOfCreatePost">Other options</p>

                <div className="inputWithSuffix">
                    <input  type="number" 
                            id="mileage" 
                            name="mileage" 
                            value={parseInt(mileage)}
                            className="formInput" 
                            onChange={ev=>setMileage(parseInt(ev.target.value))}
                            required />
                    <span className="suffix">Mileage* (10³ km)</span>
                </div>
                
                <select id="color" 
                        name="color" 
                        className="formInput" 
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
                        className="formInput"
                        onChange={ev=>setStatus(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x1F50E; Status</option>
                  <option value="new">&#x1F31F; New</option>
                  <option value="used">&#x2B50;	Used</option>
                </select>

                <select id="box" 
                        name="box" 
                        className="formInput"
                        onChange={ev=>setGearbox(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x1F579; Gearbox</option>
                  <option value="Manual">&#10001; Manual</option>
                  <option value="Automatic">&#9861; Automatic</option>
                </select>

                <select id="cylindrer" 
                        name="cylindrer" 
                        className="formInput"
                        onChange={ev=>setCylindrer(ev.target.value)}>
                  <option value="" disabled selected hidden>&#x1F6E2; Cylindrer</option>
                  <option value="0.5">&le;0.5L</option>
                  <option value="1.0">1.0L</option>
                  <option value="1.5">1.5L</option>
                  <option value="2.0">2.0L</option>
                  <option value="2.5">2.5L</option>
                  <option value="3.0">3.0L</option>
                  <option value="3.5">3.5L</option>
                  <option value="4.0">&ge;4.0L</option>   
                </select>
           
                <select id="fuel" 
                        name="fuel" 
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
                           onChange={ev=>setYear(parseInt(ev.target.value))}/>
                    <span className="suffix">Year</span>
                </div>

                <div className="inputWithSuffix">
                    <input type="number" 
                           id="fiscal_power" 
                           value={fiscalPower}
                           name="fiscal_power" 
                           className="formInput" 
                           onChange={ev=>setFiscalPower(parseInt(ev.target.value))}/>
                    <span className="suffix">Fiscal Power</span>
                </div>

            </div>
            <p className="descriptionOfCreatePost">description</p>
            <Editor value={content} onChange={setContent}/>
            
            <h3 className="titleOfCreatePost">Bidding details</h3>
            <select id="typeBidding" 
                        required
                        name="typeBidding" 
                        className="formInput"
                        onChange={ev=>setTypeBidding(ev.target.value)}>
                  <option value="" disabled selected hidden>Bidding Type</option>
                  <option value="German Bidding">&#10138; German</option>
                  <option value="Dutch Bidding">&#10004; Dutch</option>
            </select>
            <div className="inputWithSuffix ">
                    <input type="number" 
                           required
                           id="firstPrice" 
                           value={firstPrice}
                           name="firstPrice" 
                           className="formInput" 
                           onChange={ev=>setFirstPrice(ev.target.value)}/>
                    <span className="suffix">First price* (dt)</span>
            </div>
            <div className="inputWithSuffix ">
                    <input type="date" 
                           id="dateBegin" 
                           required
                           value={dateBegin}
                           name="dateBegin" 
                           className="formInput" 
                           onChange={ev=>setDateBegin(ev.target.value)}/>
                    <span className="suffix">Start date*  &nbsp; &nbsp;</span>
            </div>
            <div className="inputWithSuffix ">
                    <input type="date" 
                           id="dateEnd" 
                           required
                           value={dateEnd}
                           name="dateEnd" 
                           className="formInput" 
                           onChange={ev=>setDateEnd(ev.target.value)}/>
                    <span className="suffix">End date* &nbsp; &nbsp;</span>
            </div>
            <button style={{marginTop:'50px'}}>Create Post</button>
        </form>
        
    );
}
