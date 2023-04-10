import './App.css';
import NavbarD from './components/Navbar/Navbar-dashboard';
import NavbarSO from './components/Navbar/Navbar-signedOut';
import NavbarSI from './components/Navbar/Navbar-signedIn';
import CustomSidebar from './components/Sidebar';
import Content from './components/dashboard-Content';
import Signup from './components/signup';
import SignUpPage from './pages/signuppage';
import LogIn from './components/login';
import LogOut from './components/logout';
import LogInPage from './pages/loginpage';
import HomePage from './pages/homepage';

// FOR BETHANYS TESTING
import CardComponent from './components/Card/CardComponent';
import { RenderStarRating } from './components/Card/RenderStarRating';

import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, React } from 'react'
import { Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'

function App() {

  
  return (
    // <div className="App">
    //   <NavbarSO/>
    //   <div className='wrapper'>
    //     <LogIn />
    //   </div>
    // </div>
    <Router>
        <Routes>
          <Route path='/'>
            <Route path="login" element={<LogInPage/>} />
            <Route index element={<HomePage />}/>
            <Route path="signup" element={<SignUpPage/>}/>
            <Route path="logout" element={<LogOut />}/>
            {/* <Route path='testcard' element={
            <CardComponent
              title='hello'
              description='idk'
              price='10'
              totalPrice='30'
              topRightBtn={ <RenderStarRating rating='5'/> }
            />}/> */}
          </Route>
        </Routes>
    </Router>

  );
}

export default App;


// Signed out, not a host not a user -> become a host, log in, signup - NavbarSO
// Signed in through login, a user, and a host -> my listings, my reservations, notifications, username-dropdown -> NavbarD
// Signed in through login, a user, not a host -> become a host, my reservations, notifications, username-dropdown -> NavbarSI