import {  useContext, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";
import PhoneNumberForm from "../PhoneNumberForm";
import {API_URL} from "../myEnv";

export default function LoginPage(){
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [redirect, setRedirect]=useState(false);
    const {setUserInfo}=useContext(UserContext);
    const [phoneNumber, setPhoneNumber]= useState('');
    
    

    
   
    async function login(event){
        event.preventDefault(); 
        const headers = {
            method:'POST',
            body: JSON.stringify({username,password,phoneNumber}),
            headers: {'Content-Type':'application/json'},
            credentials:'include',
        };
        
        
        const response=
        await fetch(API_URL()+`/login`,{
            method:'POST',
            body: JSON.stringify({username,password,phoneNumber}),
            headers: {'Content-Type':'application/json'},
            credentials:'include',
        });
        
        if (response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
             
                setRedirect(true);  
            }); 
            
        }
        else{
            alert('wrong credentials');
        }
    }
        if(redirect){
           
           //window.location.reload();   //it is a
           window.location.href = '/'; //bad method
        }

       
    
    return (
        

        <form className="addPaddingTop login" onSubmit={login}>
            <h1>Login</h1>
            
            <PhoneNumberForm selectCountryBoolean=""
            value={phoneNumber} 
            onChange={event => setPhoneNumber(event.target.value)}/>
            <input type="password" 
            placeholder="Password"
            value={password}
            onChange={ev=>setPassword(ev.target.value)}></input>
            <button>Login</button>
            <p className="YouDoNotHaveAccount">
                You don't have account?
                <Link className="LinkWithoutUnderline" to={'/register'}>
                    <span>Register</span>
                </Link>
            </p>
        </form>
    );

}