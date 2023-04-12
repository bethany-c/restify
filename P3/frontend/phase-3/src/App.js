import './App.css';


import NavbarSO from './components/Navbar';
import Dashboard from './pages/dashboard';
import Signup from './components/signup';
import SignUpPage from './pages/signuppage';
import LogIn from './components/login';
import LogOut from './components/logout';
import LogInPage from './pages/loginpage';
import HomePage from './pages/homepage';
// import AuthContext from './context';
import { AuthProvider } from './context';
import PropertyRegister from './pages/property-register';
import { useContext, useState } from 'react';
import Profile from './components/dashboard-Content/profile';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'


import Approved from './components/dashboard-Content/user-approved';
import Requested from './components/dashboard-Content/user-requested';
import Cancellations from './components/dashboard-Content/user-cancelled';
import Completed from './components/dashboard-Content/user-completed';
import Terminated from './components/dashboard-Content/user-terminated';
import 'react-bootstrap'


function App() {
  // const [ isloggedin, setIsloggedin ]= useState(false);

  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path='/'>
              <Route path="login" element={<LogInPage/>} />
              <Route index element={<HomePage />}/>
              <Route path="signup" element={<SignUpPage/>}/>
              <Route path="logout" element={<LogOut />}/>
              <Route path="property_register" element={<PropertyRegister />}>

              </Route>
              <Route path='dashboard/' element={<Dashboard/>}>
                <Route path='profile/' element={<Profile />}/>
                <Route path='approved/' element={<Approved />}/>
                <Route path='requested/' element={<Requested />}/>
                <Route path='cancellations/' element={<Cancellations />}/>
                <Route path='completed/' element={<Completed />}/>
                <Route path='terminated/' element={<Terminated />}/>
              </Route>
            </Route>
          </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;


// Signed out, not a host not a user -> become a host, log in, signup - NavbarSO
// Signed in through login, a user, and a host -> my listings, my reservations, notifications, username-dropdown -> NavbarD
// Signed in through login, a user, not a host -> become a host, my reservations, notifications, username-dropdown -> NavbarSI