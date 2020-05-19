import React, { useState} from 'react';
import Navbar from "./components/Navbar";
import './App.css';
import Home from './pages/home';
import Login from './pages/login';



function App() {

  const [page, setPage] = useState('Home');

  switch(page) {
    case "Home":
      return (
        <div className="App">
          <Navbar active={page} setPage={setPage}/>
          <Home />
        </div>
      );
      case "CandidatePortal":
        return (
          <div className="App">
            <Navbar active={page} setPage={setPage}/>
            <Login />
          </div>
        );
    default:
      return (
        <div className="App">
          <Navbar active="Home" />
          <Home />
        </div>
      );
  }
  
}

export default App;
