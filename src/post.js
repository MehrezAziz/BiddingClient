import {format} from "date-fns";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import {API_URL} from "./myEnv";

export default function Post({_id,title,summary
  ,cover,content,createdAt,author,userInfo
  ,typeBidding,firstPrice,dateEnd,dateBegin,comments,overbids,likes,vues,whoLikes,winner  }){
const titre=`click to view ${author.username}'s profile`;

const [biddingBoxVisible, setBiddingBoxVisible] = useState(false);
const handleBidding=()=>{
  setBiddingBoxVisible(!biddingBoxVisible);
  
};
const handleOutsideClick = (event) => {
  const isBiddingBoxClicked = event.target.closest(".biddingBox");
  const isBiddingButtonClicked = event.target.closest(".BiddingButton");

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

  return (
    <div className="post">
      
    <div className="image">
        <Link to={`/post/${_id}`} title="Click to view more information">
        <img src={API_URL()+"/"+cover} alt="image"/> 
        </Link>
    </div>

    <div className="texts">
        <div className="containerInfoBiddingButton">
          <div>
            <Link to={`/post/${_id}`} title="Click to view more information">
            <h2>{title}</h2>
            </Link>
            <p className="info">
              <span className="UsernamePostPage">
                {author.username &&
                  <Link to={'/profile/'+author._id} 
                    className="author"
                    title={titre}>
                    {author.username}
                  </Link>
                }
                {!author.username &&
                <>Undefined</>
                }
              </span>
              
              <time>{ formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</time>
            </p>
            </div>
            { userInfo && author._id !== userInfo.id &&(
            <div className="BiddingButton"  onClick={handleBidding} title="click to add your overbid">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
               Overbid
            </div>
            )}
            {biddingBoxVisible &&(
            <div className="biddingBox">
                <form>
                  <Link to={'/biddinginfo'} target="_blank">
                    <h4 title="click to see more informations">
                      {typeBidding}
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
        <p className="summary">{summary}</p>

        <div class="time-axis">
          <div class="time-marker start" title="Auction begin date ">
            <div class="date">{format(new Date(dateBegin), 'd MMM yyyy')}</div>
            <div class="time">{format(new Date(dateBegin), 'hh:mm')}</div>
          </div>
          <div className="postFirstPrice" title={`${typeBidding}`}>
            <div className="postFirstPriceTitle">First price</div>
            <div className="postFirstPriceValue">{firstPrice} dt</div>
          </div>
          <div class="time-marker end" title="Auction end date">
            <div class="date">{format(new Date(dateEnd), 'd MMM yyyy')}</div>
            <div class="time">{format(new Date(dateEnd), 'hh:mm')}</div>
          </div>
        </div>
    </div>
    
  </div>);
}

