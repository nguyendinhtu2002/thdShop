import React from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService"
import { resetUser } from '../../features/userSlide/userSlide';

const Header = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.user);
  const { email,usename } = userLogin;
  const handleLogout = async () => {
    if(email!=""){
      await UserService.logoutUser()
      dispatch(resetUser())
    }
    else{
      signOut(auth).then(() => {
        navigate("/");
        setUser(null);
      });
    }
  };
  const toggleChecked = () => setShow(value => !value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);
 
  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          <div className="header-cnt-top fs-13 py-2 flex align-center justify-between">
            <div className="header-cnt-top-l">
              <ul className="flex top-links align-center">
                <li>
                  <Link to="/seller">Trung tâm người bán</Link>
                </li>
                <li className="vert-line"></li>
                <li>
                  <Link to="/download">Tải xuống</Link>
                </li>
                <li className="vert-line"></li>
                <li className="flex align-center">
                  <span className="fs-13">Theo dõi chúng tôi tại</span>
                  <ul className="social-links flex align-center">
                    <li className="mx-2">
                      <a href="www.facebook.com" className="fs-15">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li className="mx-2">
                      <a href="www.instagram.com" className="fs-15">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header-cnt-top-r">
              <ul className="top-links flex align-center">
                <li>
                  <Link to="/" className="top-link-itm">
                    <span className="top-link-itm-ico mx-2">
                      <i className="fa-solid fa-circle-question"></i>
                    </span>
                    <span className="top-link-itm-txt">Hỗ trợ</span>
                  </Link>
                </li>
                <li className="vert-line"></li>
                { email=="" && !user && (
                  <>
                    <li>
                      <Link to="/register">
                        <span className="top-link-itm-txt">Đăng ký</span>
                      </Link>
                    </li>
                    <li className="vert-line"></li>
                    <li>
                      <Link to="/login">
                        <span className="top-link-itm-txt">Đăng nhập</span>
                      </Link>
                    </li>
                  </>
                )}
                {  (email || user) && (
                  <div className='header-right'>
                    <img id="avatarButton" type="button"  onClick={toggleChecked} className="w-10 h-10 rounded-full cursor-pointer" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="User dropdown"/>

                      <div id="userDropdown" className={show?"z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 block absolute  ":"z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"}>
                        <div className="px-4 py-3 text-xl text-gray-900 dark:text-white">
                          <div>{usename}</div>
                        </div>
                     
                        <div className="py-1">
                          <Link to="/" onClick={handleLogout}   className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                        </div>
                      </div>
                  </div>
                )}
              </ul>
            </div>
          </div>

          <div className="header-cnt-bottom">
            <Navbar />
          </div>
        </div>
      </div >
    </header >
  );
};

export default Header;
