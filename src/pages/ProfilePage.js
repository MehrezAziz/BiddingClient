import { useState,useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Post from "../post";
import DraggableButton from "../DraggableButton";
import {API_URL} from "../myEnv";


export default function ProfilePage(){
    const {id}=useParams(); 
    const [profileInfo,setProfileInfo]= useState('');
    const [postsFiltered,setPostsFiltered]= useState('');
    const [hiddenYesNo,setHiddenYesNo]= useState(true);
    let postOnly='';

    const [phoneNumber, setPhoneNumber]=useState(null);
    const [username, setUsername]=useState(null);
    const [showPostsClicked, setShowPostsClicked]=useState(false);


    useEffect(()=>{
        fetch(API_URL()+'/profile/'+id,{           
             credentials:'include',
        })
        .then(response =>{
            response.json().then(profileInfo=>{
                setUsername(profileInfo.username);
                setPhoneNumber(profileInfo.phoneNumber);
                setProfileInfo(profileInfo);
                
            });
        });
    },[id]);
    useEffect(()=>{
        fetch(API_URL()+'/post')
        .then(response =>{
            response.json().then(postInfo =>{
                setPostsFiltered(postInfo.filter(post=> post.author._id===id))
            })
        });
        
    },[]);
    useEffect(()=>{
        const hiddenYes= document.getElementById("hidden-yes");
        const hiddenNo= document.getElementById("hidden-no");
        if(hiddenYesNo){
            hiddenYes.style.display="block";
            hiddenNo.style.display="none";
        }else{
            hiddenYes.style.display="none";
            hiddenNo.style.display="block";
        }
    },[hiddenYesNo]);
    const handleClickShowPosts= ()=>{
        setShowPostsClicked(!showPostsClicked);
        setHiddenYesNo(!hiddenYesNo);
    }
    useEffect(()=>{
        const showPosts=document.getElementById("showPosts");
        const allPosts=document.getElementById("allPosts");
        if(!showPostsClicked)
            allPosts.style.display="none";
        else
            allPosts.style.display="block";

    },[showPostsClicked]);

    return (
        <>
        <div className="addPaddingTop containerProfile" >
            <div className="leftside">    
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="logoProfile"> 
                <svg style={{height:"100px"}} 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>

                </div>
                <h2 className="usernameProfile">
                    {username}
                </h2>
                <div className="followers-nbPosts-rate">
                    <div className="followers">
                        <div className="fpr">0</div>
                        <div>followers</div>
                    </div>
                    <div className="nbPosts">
                        <div className="fpr">{postsFiltered?postsFiltered.length:0}</div>
                        <div>posts</div>
                    </div>
                    <div className="rate">
                        <div className="fpr">rating</div>
                        <div>
                            <span class="fa fa-star checked star"></span>
                            <span class="fa fa-star checked star"></span>
                            <span class="fa fa-star checked star"></span>
                            <span class="fa fa-star star"></span>
                            <span class="fa fa-star star"></span>
                        </div>
                    </div>
                </div>
                
                <div className="phoneNumberProfile">
                    {phoneNumber}
                </div>
                
                <div className="bioProfile" 
                    dangerouslySetInnerHTML={{__html:profileInfo.bio}}
                />
            </div>
            <div className="showPosts" id="showPosts" onClick={handleClickShowPosts}>
                 Show posts of {username} 
                 <span id="hidden-yes" className="triangleShowPosts" style={{color:"gray"}}> &#9662;</span>
                 <span id="hidden-no" className="triangleShowPosts" style={{color:"gray"}}> &#9652;</span>
            </div>
            <div className="rightside" id="allPosts">
            {postsFiltered.length >0 && postsFiltered.map( post =>(
                <Post  {...post}/>
            ))}
            </div>
        </div>
        <DraggableButton/>
        </>
            
            


        
    );
}