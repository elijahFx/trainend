import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ExercisesList from "./components/ExercisesList";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="main_wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<ExercisesList />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
