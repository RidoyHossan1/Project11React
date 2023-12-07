import React, {useState} from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import NoteState from "./Context/Notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import UserDetails from "./Components/UserDetails";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <>
    <NoteState>
      <Navbar />
      <Alert alert={alert} />
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />} />
        <Route exact path="/about" element={<About title="About US" showAlert={showAlert} />} />
        <Route exact path="/login" element={<Login showAlert={showAlert} />} />
        <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
        <Route exact path="/userdetails" element={<UserDetails/>} />
      </Routes>
    </NoteState>
    </>
  );
}

export default App;
