import { useEffect, useState } from "react";
import Post from "../post";
import DraggableButton from "../DraggableButton";


export default function IndexPage() {
  const [posts, setPosts] = useState(false);
  const [profile, setProfile] = useState(false);
  
  
  useEffect(() => {
    /* Test "send a message with whatsapp"
    const phoneNumber = '21621838333'; // Replace with recipient's phone number
    const message = 'refrechaaaa'; // Replace with your desired message
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    */
    fetch(`http://localhost:4000/profile`,{
            credentials:'include',
        })
        .then(response =>{
            response.json().then(userInfo=>{
                setProfile(userInfo);
            });
    });
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => setPosts(posts));
      
  }, []);

  if (!posts) return (
    <div class="parent-container">
        <div className="spinner" role="status">
            <span className="visually-hidden"></span>
        </div>
    </div>
    );
  return (
    <div className="addPaddingTop">
      {posts.length > 0 && posts.map(post => (
        <Post key={post.id} {...post} userInfo={profile}/>
      ))}
      <DraggableButton />
    </div>
  );
}

