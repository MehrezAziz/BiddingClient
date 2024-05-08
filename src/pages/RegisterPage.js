import { useState,useContext} from "react";
import { UserContext } from "../UserContext";
import {Navigate,Link } from "react-router-dom";
import PhoneNumberForm from "../PhoneNumberForm";
import {API_URL} from "../myEnv";


export default function RegisterPage(){
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [phoneNumber, setPhoneNumber]= useState('');
    const [redirect, setRedirect]=useState(false);
    const {setUserInfo}=useContext(UserContext);

    async function register(ev){
        ev.preventDefault();
        
        const response=
        await fetch(API_URL()+'/register',{
            method: 'POST',
            body: JSON.stringify({username,password,phoneNumber}),
            headers: {'Content-Type':'application/json'},
        })
        
       if (response.status ===200){

        alert('registration successful!');

        
           
            ///////to login automatically
            const headers = {
                method:'POST',
                body: JSON.stringify({username,password,phoneNumber}),
                headers: {'Content-Type':'application/json'},
                credentials:'include',
                Authorization:'',
            };
            const jwtToken = localStorage.getItem('jwtToken'); 
            if (jwtToken) {
              headers['Authorization'] = `Bearer ${jwtToken}`;
            } else {
              console.error('JWT token is missing or invalid');
            }
            
            const rep=
            await fetch(API_URL()+'/login',{
                method:'POST',
                body: JSON.stringify({username,password,phoneNumber}),
                headers: {'Content-Type':'application/json'},
                credentials:'include',
            });
            
            if (rep.ok){
                rep.json().then(userInfo=>{
                    setUserInfo(userInfo);
                    console.log("login mreglllllllllllll");
                    setRedirect(true);  
                }); 
                
            }
            else{
                alert('wrong credentialss');
            }
        
            
            /////end login automatically
        
       }else{
        if (response.status!==200)
        alert('phone number is already used ');
        
    }
    }
    if(redirect){
               
        
            window.location.reload();   //it is a
            window.location.href = '/'; //bad method
     }

    return (
        <form  className="register addPaddingTop" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
            placeholder="Username"
            value={username}
            onChange={event=>setUsername(event.target.value)}>
            </input>

            <PhoneNumberForm selectCountryBoolean=""  
            value={phoneNumber} 
            onChange={event => setPhoneNumber(event.target.value)}/>
            
            <input type="password" 
            placeholder="Password"
            value={password}
            onChange={event=>setPassword(event.target.value)}></input>
            <button>Register</button>
            <p className="YouDoNotHaveAccount">
                Already have an account?
                <Link className="LinkWithoutUnderline" to={'/login'}>
                    <span>Login</span>
                </Link>
            </p>
        </form>
    );
}