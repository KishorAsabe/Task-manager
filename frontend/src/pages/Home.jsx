import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";
import task from "../assets/task.jpg";

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = isLoggedIn
      ? `${authState.user.name}'s tasks`
      : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center h-screen bg-richblack-800 text-white relative ">
          <div className="absolute inset-0 bg-black opacity-50 "></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-150px]">

              <h1 className="text-4xl font-bold mb-4 text-center">
                Welcome to Task Manager App
              </h1>
              <p className="text-lg mb-8 text-center max-w-md">
                Organize your tasks efficiently with Task Manager.
              </p>
              <Link
                to="/signup"
                className="bg-richblack-50 text-blue-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-richblack-white hover:text-black transition-all"
              >
                Join now to manage your tasks{" "}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mt-8 mb-4 text-white text-center">
              Welcome, {authState.user.name}!
            </h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
