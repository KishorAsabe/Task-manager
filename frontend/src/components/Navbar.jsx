import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "../assets/task.jpg";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    // Use the `navigate` function to programmatically navigate to the login route
    navigate("/login");
  };
  

  return (
    <>
      <header className="flex  justify-between  top-0 p-4 items-center font-inter border-b-[1px] border-b-richblack-700">
        <div className="flex items-center  w-11/12 max-w-maxContent ">
          <h2 className="cursor-pointer text-caribbeangreen-300 uppercase font-extrabold text-2xl">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-white">Task</span>
              <span className="text-yellow-300">Manager</span>
              <i className="fa-solid fa-star text-yellow-300"></i>
            </Link>
          </h2>
        </div>
        <ul className="hidden md:flex gap-4 uppercase item-center justify-center font-medium">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-richblack-900 text-white item-center font-medium rounded-md ">
                <Link to="/tasks/add" className="block w-full h-full ">
                  <button
                    type="button"
                    className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 transition-all"
                  >
                    <i className="fa-solid fa-plus"></i> Add task
                  </button>
                </Link>
              </li>

              <li
                className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 transition-all hover:cursor-pointer"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 transition-all hover:cursor-pointer" onClick={handleLogin}>
              <Link to="/login">Log In</Link>
              </button>
            
          )}
        </ul>

        <span
          className="md:hidden text-richblack-100 cursor-pointer"
          onClick={toggleNavbar}
        >
          <i
            className={`fa-solid ${isNavbarOpen ? "fa-xmark" : "fa-bars"}`}
          ></i>
        </span>

        {/* Navbar displayed as sidebar on smaller screens */}
        <div
          className={`absolute md:hidden right-0 top-0 bottom-0 transition ${
            isNavbarOpen === true ? "translate-x-0" : "translate-x-full"
          } bg-richblack-800 shadow-md w-screen sm:w-9/12 h-screen`}
        >
          <div className="flex">
            <span
              className="m-4 ml-auto text-richblack-100 cursor-pointer"
              onClick={toggleNavbar}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-4 uppercase font-medium text-center py-2 px-[12em]">
            {authState.isLoggedIn ? (
              <>
                <li className=" text-white  font-medium transition object-cover px-[]">
                  <Link to="/tasks/add" className="block w-full h-full">
                    <button
                      type="button"
                      className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 transition-all"
                    >
                      <i className="fa-solid fa-plus"></i> Add task
                    </button>
                  </Link>
                </li>
                <li
                  className="rounded-[8px] border  border-richblack-700 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-900 transition-all"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-2 px-[12px] cursor-pointer text-richblack-900 hover:bg-richblack-200 transition rounded-sm"
              onClick={handleLogin}>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
