import React, { useEffect, useState } from "react";
import './DropdownMenu.css';
import Lottie from 'react-lottie';
import { TbLogout, TbLogin2 } from "react-icons/tb";
import hellobot from './hellobot.json';
import { useNavigate } from 'react-router-dom';
import { Send, Activity, Info, LogOut } from 'react-feather';
import axios from 'axios';
import Profile from "../Home/Profile";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: hellobot,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const DropdownMenu = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();

  useEffect(  () => {
    if (isLoggedIn) {
    
       axios.get('http://localhost:8080/user/loggedin')
        .then(response => {
          // const users = response.data.find(users => users.islogin === 1);
          // if (users) {
            if(response.data){
            console.log(response.data)
            setUser(response.data);
            setUserId(response.data.userId)
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isLoggedIn]);

  const setProfileview=()=>{
    navigate('/profile')
  }

  const handleMyApplications = () => {
    navigate('/my-applications');
  };

  const handleLogoutFunc = async()=>{
    handleLogout();
    await axios.put(`http://localhost:8080/user/updateLoginStatus/${userId}`, { islogin: 0 });
    navigate('/')
      
  }

  return (
    <div className="dropdown-menu">
      {isLoggedIn ? (
        <>
          <div className="dropdown-title">
            <div className="hellobot"><Lottie options={defaultOptions} height={50} width={50} /></div>
            <p>{user.username}</p>
          </div>
          <div className="drop-option">
            <div className="line"></div>
            <div><button className="drop-buttons" onClick={()=>navigate('/profile')}><Activity className="dropdown-icon" />My Profile</button></div>
            <div><button className="drop-buttons" onClick={handleMyApplications}><Send className="dropdown-icon" /> My Applications</button></div>
            <div><button className="drop-buttons" onClick={()=>navigate('/loantracker')}><Info className="dropdown-icon" /> Loan Tracker</button></div>
            <div className="line"></div>
          </div>
          <div className="logout-function">
            <button onClick={()=>handleLogoutFunc()} className="logout-buttton"><LogOut className="dropdown-icon" />Logout</button>
          </div>


        </>
      ) : (
        <button onClick={handleLogin}><TbLogin2 /> Login</button>
      )}
    </div>
  );
};

export default DropdownMenu;
