// not used 
import { Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import React from 'react';

// css styles 
import './contentstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useProSidebar } from 'react-pro-sidebar';

// icons
// import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Content = () => {

  const { collapsed, collapseSidebar } = useProSidebar()

  return (
    <div id="content">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Button id="sidebarCollapse" className="btn btn-info" onClick={() => collapseSidebar()}>  Toggle Sidebar </Button>
                <Button> Create Listing </Button>
            </div>
        </nav>
        {/* cards that go through come here */}

    </div>
        

  );
};

export default Content;