import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import Register from "./Register";
import UserContext from './UserContext';
import axios from 'axios';
import Login from "./Login";
import PersonalShoppingList from "./PersonalShoppingList";

function App() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})

      .then(response => {
        setEmail(response.data.email);
      });

  }, []);


  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true}).then(() => setEmail(''));
  }

  return (

    <UserContext.Provider value={{email, setEmail}}>
   
      <BrowserRouter>
        <nav>
          <Link to={'/'}>Nákupní seznam</Link>
          {!email && (
            <>
              <Link to={'/login'}>Přihlásit se</Link>
              <Link to={'/register'}>Vytvořit účet</Link>
            </>
          )}
          {!!email && (
            <a onClick={e => {e.preventDefault();logout();}}>Odhlásit se</a>
          )}
        </nav>
        <main>
          <Routes>
          <Route exact path={'/'} element={<PersonalShoppingList/>}/>
            <Route exact path={'/register'} element={<Register/>}/>
            <Route exact path={'/login'} element={<Login/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
