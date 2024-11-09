import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExercisesList from "./components/ExercisesList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import AddictionList from "./components/AddictionList";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Welcome from "./components/FrontPart/Welcome";
import CalendarList from "./components/Calendar/CalendarList";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "./slices/authSlice";



function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      const currentTime = Date.now();
      const FIVE_HOURS = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

      if (currentTime - savedUser.timestamp > FIVE_HOURS) {
        // More than 5 hours have passed, remove user data
        localStorage.removeItem("user");
        dispatch(logoutUser());  // Ensure Redux state is updated
      } else {
        // Otherwise, log in the user
        dispatch(loginUser(savedUser));
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="main_wrapper">
        <Header />
        <Routes>
          <Route path="/" element={isLoggedIn ? <ExercisesList /> : <Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addictions" element={isLoggedIn ? <AddictionList /> : <Login />} />
          <Route path="/calendar" element={isLoggedIn ? <CalendarList /> : <Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
