import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { setIdToken, setLoginStatus, setIsLogin } from "../store/authSlice";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import LOGO from '../assests/img/logo.jpeg'

const Header = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await signOutUser();
      localStorage.removeItem("idToken");
      localStorage.removeItem("userID");
      dispatch(setIdToken(null));
      dispatch(setLoginStatus(false));
      dispatch(setIsLogin(false));
      navigate("/auth");
      handleLinkClick();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-neutral-900 to-zinc-600 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center lg:flex lg:justify-center lg:items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold text-white">
          {/* <span className="pt-4">EduMinds</span> */}
          <img src={LOGO} alt="logo image" className=" h-12 scale-120 bg-cover rounded-full"/>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center space-x-8 text-lg md:text-2xl text-white mx-auto">
          <Link
            to="/"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Move login/logout button to the right in desktop view */}
        <div className="hidden md:flex ml-auto">
          {loginStatus ? (
            <button
              onClick={logoutHandler}
              className="py-3 px-3 text-sm rounded bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="py-3 px-4 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar for mobile view */}
      <div
        className={`fixed text-center top-0 right-0 h-full w-64 bg-neutral-900 p-4 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <button
            className="text-white text-3xl float-right"
            onClick={toggleSidebar}
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col mt-4">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="py-2 text-white hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>

            <Link
              to="/courses"
              onClick={handleLinkClick}
              className="py-2 text-white hover:text-gray-300 transition duration-300"
            >
              Courses
            </Link>

            <Link
              to="/about"
              onClick={handleLinkClick}
              className="py-2 text-white hover:text-gray-300 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="py-2 text-white hover:text-gray-300 transition duration-300"
            >
              Contact
            </Link>

            {loginStatus ? (
              <button
                onClick={logoutHandler}
                className="py-1 px-4 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 mt-4"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={handleLinkClick}
                className="py-1 px-2 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 mt-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Social Media Icons at the Bottom */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaFacebookF className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaTwitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaInstagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaLinkedin className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-200 hover:text-blue-600 mt-2 mb-3">
            © {new Date().getFullYear()} EduMinds. All rights reserved.
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
