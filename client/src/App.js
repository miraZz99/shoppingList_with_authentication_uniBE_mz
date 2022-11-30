import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {useState} from 'react';
import Register from "./Register";
import UserContext from './UserContext';

function App() {
  const [email, setEmail]
  return (

    <UserContext.Provider value={{email:''}}>
   
      <BrowserRouter>
        <div>
          <Link to={'/'}>Home</Link> |
          <Link to={'/login'}>Login</Link> |
          <Link to={'/register'}>Register</Link>
        </div>
        <Routes>
          <Route exact path={'/register'} element={<Register/>}/> 
        </Routes>
        <hr/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
