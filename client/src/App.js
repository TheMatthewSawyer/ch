import React, { useState} from 'react';
import Navbar from "./components/Navbar";
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Roles from './pages/roles';
import Recruiter from './pages/recruiter';
import Candidate from './pages/candidate';
import CreateProfile from './pages/createProfile';

function App() {
  //MATTHEW'S ROUTER :P
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
            <Login setPage={setPage}/>
          </div>
        );
        case "Roles":
          return (
            <div className="App">
              <Navbar active={page} setPage={setPage}/>
              <Roles />
            </div>
          );
          case "Candidate":
          return (
            <div className="App">
              <Navbar active={page} setPage={setPage}/>
              <Candidate setPage={setPage} />
            </div>
          );
          case "Recruiter":
            return (
              <div className="App">
                <Navbar active={page} setPage={setPage}/>
                <Recruiter />
              </div>
            );
            case "CreateProfile":
              return (
                <div className="App">
                  <Navbar active={page} setPage={setPage}/>
                  <CreateProfile setPage={setPage}/>
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
