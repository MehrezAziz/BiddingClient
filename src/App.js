import './App.css';
import React, { useState, useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import Layout from './Layout';
import IndexPage from "./pages/IndexPage"
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import EditProfile from './pages/EditProfile';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import useDarkMode from './UseDarkMode';
import BiddingInfo from './pages/BiddingInfo';
import EditBidding from './pages/EditBidding';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode(); 
  return (
    <UserContextProvider>
      <Routes>
        
          <Route path="/" element={ <Layout/> } >
              
              <Route index element={<IndexPage/>} />
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              
              <Route path="/create" element={<CreatePost/>}/>
              <Route path="/post/:id" element={<PostPage/>}/>
              <Route path="/edit/:id" element={<EditPost/>}/>
              <Route path="/editBidding/:id" element={<EditBidding/>}/>
              
              <Route path="/profile/:id" element={<ProfilePage/>}/>
              <Route path="/editprofile/:id" element={<EditProfile/>}/>

              <Route path="/settings/:id" element={<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>}/>

              <Route path="/biddinginfo" element={<BiddingInfo/>}/>
               
          </Route>
    </Routes>
   </UserContextProvider>
    
    

  );
}

export default App;
