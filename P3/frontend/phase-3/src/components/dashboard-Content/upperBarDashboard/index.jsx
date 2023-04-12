// not used 
import {Button} from 'react-bootstrap';
// import { BsList } from 'react-icons/bs';
// import { FaUserAlt, FaBell } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

import React from 'react';

// css styles 
import '../../dashboard-Content/contentstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { useProSidebar } from 'react-pro-sidebar';

// icons
// import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpperBarDashboard = (props) => {
  const {collapsed, setCollapsed} = props.collapseStatus
  
  const { collapseSidebar } = useProSidebar()

  const collapse = () => {
    if (collapsed) {
      collapseSidebar()
      setCollapsed(false)
    }
    else if (!collapsed) {
      collapseSidebar()
      setCollapsed(true)
  }

  }

  return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Button id="sidebarCollapse" className="btn btn-info" onClick={collapse}>  Toggle Sidebar </Button>
                <Button as={Link} to="/property_register"> Create Listing </Button>
            </div>
        </nav>

        

  );
};

export default UpperBarDashboard;