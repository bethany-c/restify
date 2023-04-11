// import './App.css';
import NavbarD from '../../components/Navbar/Navbar-dashboard';
import NavbarSI from '../../components/Navbar/Navbar-signedIn';
import NavbarSO from '../../components/Navbar/Navbar-signedOut';
import LogIn from '../../components/login';
// import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'

function LogInPage() {
  return (
    <div className="loginpage App">
      <NavbarSO/>
      <div className='wrapper'>
        <LogIn />
      </div>
    </div>

  );
}

export default LogInPage;


// Signed out, not a host not a user -> become a host, log in, signup - NavbarSO
// Signed in through login, a user, and a host -> my listings, my reservations, notifications, username-dropdown -> NavbarD
// Signed in through login, a user, not a host -> become a host, my reservations, notifications, username-dropdown -> NavbarSI