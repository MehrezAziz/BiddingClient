import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {API_URL} from "../myEnv";

export default function EditBidding(){
    const {id}=useParams(); 
    const [redirect,setRedirect]= useState(false);

    const [typeBidding, setTypeBidding]=useState('Undefined');
    const [firstPrice,setFirstPrice]=useState(0);
    const [dateBegin,setDateBegin]=useState('');
    const [dateEnd,setDateEnd]=useState('');
    const [cover,setCover]=useState('');
    const [bannedPost,setBannedPost]=useState(false);

    useEffect(()=>{
        fetch(API_URL()+'/post/'+id)
        .then(response =>{
            response.json().then(postInfo=>{
                setTypeBidding(postInfo.typeBidding);
                setFirstPrice(postInfo.firstPrice);
                setDateBegin(new Date(postInfo.dateBegin).toISOString().split('T')[0]);
                setDateEnd(new Date(postInfo.dateEnd).toISOString().split('T')[0]);
                setCover(postInfo.cover);
                
            });
        });
    },[]);
    
    async function updateBidding(ev){
        ev.preventDefault();
        const data= new FormData();
        data.set('firstPrice',firstPrice);
        data.set('dateBegin',new Date(dateBegin).toISOString());
        data.set('dateEnd',new Date(dateEnd).toISOString());
        data.set('typeBidding',typeBidding);
        data.set('id',id);

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

    if (redirect){ 
        return <Navigate to={'/post/'+id} />
    }
    return (
        <form onSubmit={updateBidding} className="addPaddingTop">
            <h3 className="titleOfCreatePost">Edit Bidding</h3>
            { cover&&
            <div className="containerImageBidding">
                <div className="SmallImageEditBidding">
                    <img src={`${API_URL()}/${cover}`} alt="car image"/>
                </div>
            </div>
            }
            <select id="typeBidding" 
                        required
                        name="typeBidding" 
                        value={typeBidding}
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
            <button style={{marginTop:'40px'}}>Update Bidding</button>

        </form>
    );
}