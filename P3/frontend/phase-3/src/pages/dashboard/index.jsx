import './App.css';
import NavbarD from './components/Navbar/Navbar-dashboard';
import NavbarSO from './components/Navbar/Navbar-signedOut';
import NavbarSI from './components/Navbar/Navbar-signedIn';
import CustomSidebar from './components/Sidebar';
import Content from './components/dashboard-Content';
import 'bootstrap/dist/css/bootstrap.min.css';




function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <NavbarD/>
      <div className='wrapper'>
        <CustomSidebar />
        <Content/>
      </div>
    </div>
  );
}

export default Dashboard;


// Signed out, not a host not a user -> become a host, log in, signup - NavbarSO
// Signed in through login, a user, and a host -> my listings, my reservations, notifications, username-dropdown -> NavbarD
// Signed in through login, a user, not a host -> become a host, my reservations, notifications, username-dropdown -> NavbarSI