import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ExercisesList from "./components/ExercisesList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import AddictionList from "./components/AddictionList";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { useSelector } from "react-redux";


function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <>
      <BrowserRouter>
        <div className="main_wrapper">
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ? <ExercisesList /> : <Login />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/addictions" element={isLoggedIn ? <AddictionList /> : <Login />} />
            <Route path="/*" element={<NotFound />}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
