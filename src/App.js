import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import HashLoader from "react-spinners/HashLoader";
//pages
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ViewBooks from './pages/ViewBooks';
import Borrow from './pages/borrow_books';
import SearchPage from './pages/search_page';
import { auth } from "./pages/firebase";
import { Component } from 'react';

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);


  const [isloading, setisloading] = useState(true);

  useEffect(() => {
  
    // Wait for 3 seconds
    setTimeout(() => {
      setisloading(false);
    }, 3000);
  }, []);
  
  // Custom css for loader
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  return isloading ?
  
    // If page is still loading then splash screen
    <HashLoader color={'#250339'} isLoading={isloading}
      css={override} size={80} style={{display: 'flex', justifyContent: 'right'}}/> :
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewbooks" element={<ViewBooks />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/borrowbooks" element={<Borrow />} />
        </Routes>
      </Router>

    </div>
  
}

export default App;
