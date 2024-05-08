import { useState,useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import {API_URL} from "../myEnv";

export default function EditProfile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const {id}=useParams(); 
    
    
    const [phoneNumber, setPhoneNumber]=useState(null);
    const [Name, setName]=useState(null);
    const [bio, setBio]=useState(null);
    const [newPassword,setNewPassword]=useState(null);
    const [newPasswordConfirm,setNewPasswordConfirm]=useState(null);
    
    const [isPasswordFieldEmpty, setIsPasswordFieldEmpty] = useState(true);
    const [redirect,setRedirect]= useState(false);
    
    const [changePasswordBtn,setChangePasswordBtn]=useState(true);
    const [keepPasswordBtn,setKeepPasswordBtn]=useState(false);

    const handleButtonChange= ()=>{
        setChangePasswordBtn(!changePasswordBtn);
        setKeepPasswordBtn(!keepPasswordBtn);
        if(!changePasswordBtn){
            document.getElementById("newPass").style.display="none"
            document.getElementById("confirmPass").style.display="none"
        }else{
            document.getElementById("newPass").style.display="block"
            document.getElementById("confirmPass").style.display="block"

        }
    };

    const handleNewPasswordFieldChange = (event) => {
        const newPasswordValue = event.target.value;
        setNewPassword(newPasswordValue);
        setIsPasswordFieldEmpty(newPasswordValue === '');
    };

    const togglePasswordVisibility1 = () => {
        const passwordInput = document.getElementById("passwordInput1");
        setShowPassword(!showPassword);
        passwordInput.type = showPassword ? "password" : "text";
    };
    const togglePasswordVisibility2 = () => {
        const passwordInput = document.getElementById("passwordInput2");
        setShowPasswordConfirm(!showPasswordConfirm);
        passwordInput.type = showPasswordConfirm ? "password" : "text";
    };

    useEffect(()=>{
        if(changePasswordBtn){
            document.getElementById("changePassword").style.display="block"
            document.getElementById("keepPassword").style.display="none"
        }
        if(keepPasswordBtn){
            document.getElementById("changePassword").style.display="none"
            document.getElementById("keepPassword").style.display="block"
    
        }
    },[keepPasswordBtn,!changePasswordBtn]);

    useEffect(()=>{
        if(!changePasswordBtn){
        if(!isPasswordFieldEmpty){
            document.getElementById("confirmPass").style.display="block"
        }
        else{
            document.getElementById("confirmPass").style.display="none"
    
        }
        }else{
            document.getElementById("confirmPass").style.display="none"
            document.getElementById("newPass").style.display="none"

        }
    },[isPasswordFieldEmpty]);
    
    useEffect(()=>{
        fetch(API_URL()+'/profile',{           
             credentials:'include',
        })
        .then(response =>{
            response.json().then(profileInfo=>{
                setName(profileInfo.username);
                setBio(profileInfo.bio);
                setPhoneNumber(profileInfo.phoneNumber);

            });
        });
    },[]);
    function verifPassword(pass){
        if(pass){
            if(pass.length>3){
                return true;
            }
        }
        return true;
    }

    async function updateProfile(ev){
        ev.preventDefault();
       
        if(newPassword!==newPasswordConfirm){
            alert("Wrong password confirmation.\nTry again");
        }else{
        
        if(verifPassword(newPassword)){

        const response=
        await fetch(API_URL()+'/profile',{
           method: 'PUT',
           headers: {
            'Content-Type': 'application/json' 
            },
           body:JSON.stringify({
            'username':Name,
            'password':newPassword,
            'id':id,
            'phoneNumber':phoneNumber,
            'bio':bio,

           }),
           credentials: 'include',

        });
        if(response.ok){
            setRedirect(true);
          }
        }else{
            alert("password's length should be more than 3 characters!");
        }
        
        }
    }
    

    if (redirect){ 
        //window.location.reload();   
        window.location.href = '/';
    }
    
    
    return (
        <form  onSubmit={updateProfile} className="addPaddingTop">
            
            <input type="text" 
                placeholder="New name"  
                value={Name}
                onChange={ev =>setName(ev.target.value)}/>
            <div className="button-21" 
                id="changePassword"
                onClick={handleButtonChange}>
                Click to change password
            </div>

            
            <div className="button-21" 
                id="keepPassword"
                onClick={handleButtonChange}>
            <div style={{display:"flex", gap:"5px"}}>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>

                Keep password
            </div>
            </div>

            <div className="password-container" 
                id="newPass"
                style={{display:"none"}}>
                <input
                    type={showPassword ? "text" : "password"}
                    id="passwordInput1"
                    placeholder="New password"
                    value={newPassword}
                    onChange={handleNewPasswordFieldChange}
                />
                <span className="toggle-password" onClick={togglePasswordVisibility1}>
                    
                        {showPassword ? (
                            
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                         </svg>
                        
                          
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )}
                    
                </span>
            </div>

            <div className="password-container" 
                id="confirmPass"
                style={{display:"none"}}>
                <input
                    type={showPasswordConfirm ? "text" : "password"}
                    id="passwordInput2"
                    value={newPasswordConfirm}
                    onChange={ev =>setNewPasswordConfirm(ev.target.value)}
                    placeholder="Confirm password"
                />
                <span className="toggle-password" onClick={togglePasswordVisibility2}>
                    
                        {showPasswordConfirm ? (
                            
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                         </svg>
                        
                          
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )}
                    
                </span>
            </div>
            <h3  className="Bio">Bio</h3>
            <Editor onChange={setBio} value={bio}  />
            <button className="BioButton">Edit Profile</button>
        </form>
    );
}
