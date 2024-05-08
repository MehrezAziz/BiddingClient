import { useContext, useEffect, useState, useRef } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
import {Navigate, useLocation} from "react-router-dom";
import useDarkMode from "./UseDarkMode";
import { API_URL } from "./myEnv";
export default function Header(){
   
    const [username, setUsername]=useState(null);
    const [phoneNumber, setPhoneNumber]=useState(null);
    const [id, setUserId]=useState(null);
    const {userInfo,setUserInfo}= useContext(UserContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef =  useRef(null);
    const [redirect, setRedirect]=useState(false);

    const { darkMode, toggleDarkMode } = useDarkMode(); 
    const location = useLocation();

    

    const headers = {
        credentials:'include',
    };
    

    useEffect(()=>{
        fetch(API_URL()+'/profile',headers).then(res =>{
            res.json().then( userInfo =>{
                setUsername(userInfo.username);
                setPhoneNumber(userInfo.phoneNumber);
                setUserId(userInfo.id);
                setUserInfo(userInfo);
            });
        });
    },[])

    function logout(){
        const confirmation=window.confirm("Are you sure you want to Logout?");
        if (confirmation){
        fetch(API_URL()+'/logout',{
            credentials: 'include',
            method:'POST',
        });
        setUserInfo(null);
        setUsername(null);
        setPhoneNumber(null);
        setRedirect(true);
        }
    }
    function menuBar(){
        setMenuVisible(!menuVisible);
    }
    const handleMenuItemClick = (action) => {
        console.log(`${action} clicked`);
        setMenuVisible(false);
      };
    const handleClickOutside = (event) => {
        if (menuRef?.current && !menuRef?.current.contains(event.target)) {
          setMenuVisible(false);
          
        }
    };
   /* const handlerDarkMode= ()=>{
        const dark= document.getElementById("DarkUsed");
        const light= document.getElementById("LightUsed");
        //toggleDarkMode;
    }
    const handlerLightMode= ()=>{
        const dark= document.getElementById("DarkUsed");
        const light= document.getElementById("LightUsed");
        
        //toggleDarkMode;
          
    }*/
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  //  const username =userInfo?.username; //it may be null
    
    if(redirect){
        window.location.reload();   
        window.location.href = '/'; 
        // <Navigate to={'/'}/>
    }
    return (<header className={`styleHeader ${darkMode? "dark-mode-Heaher":"light-mode-Heaher"}`}>
        <div  className={`Home ${location.pathname==="/"? "HomeOnFocus":""}`}>
            <Link to="/" className="logo">Home</Link>
        </div>
        <nav>
           {username &&(
            <>
            <div className={`${location.pathname==="/create"? "BorderOnFocus":""}`}>    
                <Link to="/create" className="userLink">
                    <svg style={{color:"green"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Create Post  
                </Link>
            </div>  

            <div className="userLink userLinkProfile" 
                ref={menuRef} 
                onClick={menuBar}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span>{username}</span>
                {menuVisible && (
                <div className="menu-bar" >
                    <Link to={'/profile/'+id}>
                        <div className="menuHeader menu-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                            <h2>{username}</h2>
                            <h5>{phoneNumber}</h5>
                        </div>
                    </Link>

                    <div className="menu-item">
                    <Link to={`/editprofile/${id}`}  
                        onClick={() => handleMenuItemClick("Edit profile")}>
                        <div className="userLinkMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Edit Profile
                        </div>
                    </Link>
                    </div>

                    <div className="menu-item " 
                    onClick={() => handleMenuItemClick("Settings")}>
                        <Link to={'/settings/'+id} >
                            <div className="userLinkMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            Settings
                            </div>
                        </Link>
                    </div>

                    <div className="menu-item" 
                        onClick={() => handleMenuItemClick("Logout")}>
                        <a onClick={logout} className="userLinkMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Logout
                        </a>
                    </div>

                </div>
                )}
            </div>

            </>
            )}
            {!username &&(
            <>
                {darkMode && 
                <span
                    onClick={toggleDarkMode} 
                    className="DarkUsed">&#x26AA;
                </span>}
                {!darkMode && 
                <span 
                    onClick={toggleDarkMode} 
                    className="DarkUsed">&#x26AB;
                </span>}
                <div className={`${location.pathname==="/login"? "BorderOnFocus":""}`}>
                    <Link to="/login" className="userLink">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                        Login 
                    </Link>
                </div>

                <div className={`${location.pathname==="/register"? "BorderOnFocus":""}`}>
                    <Link to="/register" className="userLink">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                        Register 
                    </Link>
                </div>
            </>
            )}

            
        </nav>
    </header>);
}