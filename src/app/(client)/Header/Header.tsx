"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie';
import { CiUser } from "react-icons/ci";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import './Header.css';


interface UserData {
  user: {
    name: string;
    email: string;
    profilePicture?: string;
  }
}

const Header = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/signin');
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':token
          }
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if ((error as any).response?.status === 401) {
          Cookies.remove('token');
          router.push('/signin');
        }
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    setUserData(null);
    router.push('/signin');
  };


  return (
    <div className="header-container">
      <div className="logo-container">
        <div id="three-bars-logo">
          <VscThreeBars size={24} color="#45add9" />
        </div>
        <h1 className="mega-mart-logo">MegaMart</h1>
      </div>

      <div className="search-container">
        <div id="search-logo">
          <FaSearch size={24} color="#45add9" />
        </div>
        <input
          type="text"
          placeholder="Search essentials, groceries and more..."
          className="search-input"
        />
        <div id="three-dot-logo">
          <BsThreeDotsVertical size={24} color="#45add9" />
        </div>
      </div>

      <div className="user-actions-container">
        <div 
          className="sign-in-container"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {userData?.user?.profilePicture ? (
            <img 
              src={userData.user.profilePicture} 
              alt="Profile" 
              className="user-profile-pic" 
            />
          ) : (
            <CiUser size={24} color="#4a4a4a" />
          )}
          
          {userData ? (
            <span className="user-sign">{userData.user.name}</span>
          ) : (
            <>
              <Link href="/signup" className="sign-button">Sign Up /</Link>
              <Link href="/signin" className="sign-button">Sign In</Link>
            </>
          )}
        </div>

        {userData && showUserMenu && (
          <div className="user-dropdown-menu">
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Settings</div>
            <div 
              className="dropdown-item logout-item" 
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}

        <div id="line"></div>
        <div className="cart-container">
          <FaCartArrowDown size={24} color="#4a4a4a" />
          <span className="cart-text">Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Header;