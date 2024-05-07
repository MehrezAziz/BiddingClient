import { formatISO9075 } from "date-fns";
import { useContext,useEffect ,useState} from "react";
import { useParams ,Link, Navigate} from "react-router-dom";
//import {EditPost} from "EditPost";
import { formatDistanceToNow } from 'date-fns';
import {format} from "date-fns";


export default  function PostPage(){
    const [postInfo,setPostInfo]= useState(null);
    const [userInfo,setUserInfo]= useState(null);
    const [poster,setIdposter]= useState(null);
    const [isDeletedPost, setIsDeletedPost] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {id}=useParams();

    /* click outside bidding box*/
const [biddingBoxVisible, setBiddingBoxVisible] = useState(false);
const handleBidding=()=>{
  setBiddingBoxVisible(!biddingBoxVisible);
  
};
const handleOutsideClick = (event) => {
  const isBiddingBoxClicked = event.target.closest(".biddingBoxInsidePostPage");
  const isBiddingButtonClicked = event.target.closest(".overbid-now");

  if (!isBiddingBoxClicked && !isBiddingButtonClicked && biddingBoxVisible) {
    setBiddingBoxVisible(false);
  }
};
useEffect(() => {
  document.addEventListener("click", handleOutsideClick);
  return () => {
    document.removeEventListener("click", handleOutsideClick);
  };
}, [biddingBoxVisible]);
/*end of bidding box "click outside"  */ 

    useEffect(()=>{
        setIsLoading(true);
        fetch(`http://localhost:4000/post/${id}`)
        .then(response =>{
            response.json().then(postInfo=>{
                setPostInfo(postInfo);
                setIsLoading(false);
            });
        });
        fetch(`http://localhost:4000/profile`,{
            credentials:'include',
        })
        .then(response =>{
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setIsLoading(false);
            });
        });
        
    },[]);
    const handleDeletePost =async ()=>{
        const confirmation =window.confirm("Are you sure you want to delete this post "+postInfo.title+"?\n");
        if (confirmation){
            const response=
            await fetch(`http://localhost:4000/deletepost/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
              if (response){
                setIsDeletedPost(true);
                //window.location.reload();   
                //window.location.href = '/';
              }
        }
    }
    if (isDeletedPost) {
          window.location.reload();   
          window.location.href = '/';
    }
    if (isLoading){
        return (
        <div class="parent-container">
            <div className="spinner" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>);
    }
    if (!postInfo) return (
        <div class="parent-container">
            <div className="spinner" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>);
    return (
        <div className="post-page addPaddingTop">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            
                
                <div className="author">
                    by @
                    <span className="UsernamePostPage">
                        { postInfo.author.username &&
                        <Link to={'/profile/'+postInfo.author._id} >
                           {postInfo.author.username}
                        </Link>
                        }
                        { !postInfo.author.username &&
                        <>Undefined</>
                        }
                    </span>
                </div>
            
            {postInfo.author._id === userInfo.id &&(
                <div className="edit-row"> 
                    <div>
                        <Link className="edit-btn edit-btn-Post" to={`/edit/${postInfo._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                                Edit  post
                        </Link>
                    </div>
                    <div>
                        <Link className="edit-btn edit-btn-Bidding" to={`/editBidding/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                                Edit bidding
                        </Link>
                    </div>
                </div>
            )}          
            {postInfo.author._id !== userInfo.id &&userInfo &&(
                <div className="edit-row" > 
                    <div className="overbid-now" onClick={handleBidding}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                            Overbid now
                    </div>
                    {biddingBoxVisible &&(
                   <div className="biddingBoxInsidePostPage ">
                   <form>
                     <Link to={'/biddinginfo'} target="_blank">
                       <h4 title="click to see more informations">
                         German bidding
                       </h4>
                     </Link>
                     <label htmlFor="MyPrice">your price:</label>
                     <input type="number" id="MyPrice"></input>
                     <div className="containerSendButtons">
                     <button className="sendOverbid">
                       send
                         <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                         </svg>

                     </button>
                     <button className="sendOverbid sendOverbidWhatsapp">
                      send via 
                      <div class="whatsapp-ico">
                        <svg viewBox="0 0 32 32" >
                          <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fill-rule="evenodd"></path>
                        </svg>
                      </div>
                    </button>
                    </div>
                   </form>
               </div>
                    )}
                </div>
            )}        
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} />
            </div>
            <div class="time-axis ta2">
                <div class="time-marker start" title="Auction begin date ">
                  <div class="date">{format(new Date(postInfo.dateBegin), 'd MMM yyyy')}</div>
                  <div class="time">{format(new Date(postInfo.dateBegin), 'hh:mm')}</div>
                </div>
                <div className="postFirstPrice" title={`${postInfo.typeBidding}`}>
                  <div className="postFirstPriceTitle">First price</div>
                  <div className="postFirstPriceValue">{postInfo.firstPrice} dt</div>
                </div>
                <div class="time-marker end" title="Auction end date">
                  <div class="date">{format(new Date(postInfo.dateEnd), 'd MMM yyyy')}</div>
                  <div class="time">{format(new Date(postInfo.dateEnd), 'hh:mm')}</div>
                </div>
            </div>
            <div className="otherFeatures">
                <div className="oneFeatureCar"><span className="nounOfFeature">Mileage</span>{postInfo.mileage ||postInfo.mileage===0?postInfo.mileage:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Color</span>{postInfo.color?postInfo.color:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Status</span>{postInfo.status?postInfo.status:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Gearbox</span>{postInfo.gearbox?postInfo.gearbox:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Cylindrer</span>{postInfo.cylindrer?postInfo.cylindrer:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Fuel</span>{postInfo.fuel||postInfo.fuel===0?postInfo.fuel:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Year</span>{postInfo.year||postInfo.year===0?postInfo.year:'Undefined'}</div>
                <div className="oneFeatureCar"><span className="nounOfFeature">Fiscal power</span>{postInfo.fiscalPower?postInfo.fiscalPower:'Undefined'}</div>
            </div>

            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
            {postInfo.author._id === userInfo.id &&(
                <div className="edit-row"> 
                    <a className="delete-btn" onClick={handleDeletePost}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                        Delete this post
                    </a>
                </div>
            )} 
        </div>
    );
}


 