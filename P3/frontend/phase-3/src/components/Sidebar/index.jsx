import React, {useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Sidebar/sidebarstyle.css';
import Collapse from 'react-bootstrap/Collapse';
import Accordion from 'react-bootstrap/Accordion';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';



const CustomSidebar = () => {

  return (
            <Sidebar collapsedWidth="0px">
                <Menu className='bg-color h-100' id='sidebar'>
                    <br />
                    <br />
                    <br />
                    <Navbar.Brand className="w-100 m-0">
                        <Nav.Link className="fs-2" to="../index.html">Restify</Nav.Link>
                    </Navbar.Brand>
                    <br />
                    <br />
                    <br />
                    <MenuItem className='hoverit'> <FaUserAlt /> Profile </MenuItem>
                    <br />
                    <br />
                    <h4> Your Dashboard </h4>
                    <SubMenu className='hoverit' label="Your Orders">
                        <MenuItem className='hoverit'> Approved </MenuItem>
                        <MenuItem className='hoverit'> Requested </MenuItem>
                        <MenuItem className='hoverit'> Cancellations </MenuItem>
                        <MenuItem className='hoverit'> Completed </MenuItem>
                        <MenuItem className='hoverit'> Terminated </MenuItem>
                    </SubMenu>
                    <MenuItem className='hoverit'> <FaBell/> Notifications </MenuItem>
                    <br />
                    <br />
                    <br />
                    <h4> Host Dashboard </h4>
                    <SubMenu label="Your Listings" className='hoverit'>
                        <MenuItem className='hoverit'> Requests </MenuItem>
                        <MenuItem className='hoverit'> Approved </MenuItem>
                        <MenuItem className='hoverit'> Cancellations </MenuItem>
                        <MenuItem className='hoverit'> Completed </MenuItem>
                        <MenuItem className='hoverit'> Terminated </MenuItem>
                        <MenuItem className='hoverit'> All listings </MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        
        

  );
};

export default CustomSidebar;

{/* <div className="sidebar-wrapper">
<Navbar classNameName="sidebar" expand="lg">
    <Navbar.Brand>
        <Nav.Link to="../index.html">Restify</Nav.Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav">
        <BsList />
    </Navbar.Toggle>
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav classNameName="flex-column">
            <h4 classNameName="smallheader">Your Dashboard</h4>
            <Nav.Item>
                <Nav.Link to="../Profile_pageBoth/ProfilePageDashboard.html">
                    <FaUserAlt /> Profile
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Your Orders" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Approved</NavDropdown.Item>
                <NavDropdown.Item href="../Your_OrdersUser/UserRequested.html">Requested</NavDropdown.Item>
                <NavDropdown.Item href="../Your_OrdersUser/UserCancellations.html">Cancellations</NavDropdown.Item>
                <NavDropdown.Item href="../Your_OrdersUser/UserCompleted.html">Completed</NavDropdown.Item>
                <NavDropdown.Item href="../Your_OrdersUser/UserTerminated.html">Terminated</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link to="../NotificationsBoth/notifications.html">
                    <FaBell />Notifications
                </Nav.Link>
            </Nav.Item>
            <h4 classNameName="smallheader">Host Dashboard</h4>
            <NavDropdown title="Your Listings" id="basic-nav-dropdown">
                <NavDropdown.Item href="../Your_ListingsHost/HostRequests.html">Requests</NavDropdown.Item>
                <NavDropdown.Item href="../Your_ListingsHost/HostCancellations.html">Approved</NavDropdown.Item>
                <NavDropdown.Item href="../Your_ListingsHost/HostCancellations.html">Cancellations</NavDropdown.Item>
                <NavDropdown.Item href="../Your_ListingsHost/HostCompleted.html">Completed</NavDropdown.Item>
                <NavDropdown.Item href="../Your_ListingsHost/HostTerminated.html">Terminated</NavDropdown.Item>
                <NavDropdown.Item href="../Your_ListingsHost/AllListings.html">All Listings</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
</Navbar>
</div> */}


        {/* <nav id="sidebar">
            <div className="sidebar-header">
                <h3><a href="../index.html">Restify</a></h3>
            </div>
            <br />
            <ul className="list-unstyled components">
                <h4 className="smallheader">Your Dashboard</h4>
                <li>
                    <a href="../Profile_pageBoth/ProfilePageDashboard.html">Profile</a>
                </li>
                <li>
                    <a href="#homeSubmenu" data-toggle="collapse" data-bs-toggle="collapse" aria-expanded="true" className="dropdown-toggle">Your Orders</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li className="active">
                            <a href="#">Approved</a>
                        </li>
                        <li>
                            <a href="../Your_OrdersUser/UserRequested.html">Requested</a>
                        </li>
                        <li>
                            <a href="../Your_OrdersUser/UserCancellations.html">Cancellations</a>
                        </li>
                        <li>
                            <a href="../Your_OrdersUser/UserCompleted.html">Completed</a>
                        </li>
                        <li>
                            <a href="../Your_OrdersUser/UserTerminated.html">Terminated</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="../NotificationsBoth/notifications.html">Notifications</a>
                </li>
                <br />
                <br />
                <h4 className="smallheader">Host Dashboard</h4>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Your Listings</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="../Your_ListingsHost/HostRequests.html">Requests</a>
                        </li>
                        <li>
                            <a href="../Your_ListingsHost/HostCancellations.html">Approved</a>
                        </li>
                        <li>
                            <a href="../Your_ListingsHost/HostCancellations.html">Cancellations</a>
                        </li>
                        <li>
                            <a href="../Your_ListingsHost/HostCompleted.html">Completed</a>
                        </li>
                        <li>
                            <a href="../Your_ListingsHost/HostTerminated.html">Terminated</a>
                        </li>
                        <li>
                            <a href="../Your_ListingsHost/AllListings.html">All Listings</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <script>
            

        </script> </> */}

    //     <Navbar id="sidebar" expand="lg" className="flex-wrap">
    //     <Navbar.Brand className="w-100 m-0">
    //         <Nav.Link className="fs-2" to="../index.html">Restify</Nav.Link>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav">
    //         <BsList />
    //     </Navbar.Toggle>
    //     <br />
    //     <br />
    //     <br />
    //     <Navbar.Collapse className='align-items-stretch w-100' id="basic-navbar-nav">
    //         <Nav className="flex-column w-100 m-0">
    //             <h4 className="smallheader">Your Dashboard</h4>
    //             <Nav.Item>
    //                 <Nav.Link to="../Profile_pageBoth/ProfilePageDashboard.html">
    //                     Profile
    //                 </Nav.Link>
    //             </Nav.Item>
    //             <Accordion id="the-accordion">
    //                 <Accordion.Header id='dropdown-header'>Your Orders</Accordion.Header>
    //                 <Accordion.Body className='p-0'>
    //                     <Nav.Link href="#">Approved</Nav.Link>
    //                     <Nav.Link href="../Your_OrdersUser/UserRequested.html">Requested</Nav.Link>
    //                     <Nav.Link href="../Your_OrdersUser/UserCancellations.html">Cancellations</Nav.Link>
    //                     <Nav.Link href="../Your_OrdersUser/UserCompleted.html">Completed</Nav.Link>
    //                     <Nav.Link href="../Your_OrdersUser/UserTerminated.html">Terminated</Nav.Link>
    //                 </Accordion.Body>
    //             </Accordion>
                
    //             <Nav.Item>
    //                 <Nav.Link to="../NotificationsBoth/notifications.html">
    //                     Notifications
    //                 </Nav.Link>
    //             </Nav.Item>
    //             <br />
    //             <br />
    //             <br />
    //             <h4 className="smallheader">Host Dashboard</h4>
    //             <Accordion id="the-accordion">
    //                 <Accordion.Header id='dropdown-header'>Your Listings</Accordion.Header>
    //                 <Accordion.Body className='p-0'>
    //                     <Nav.Link href="../Your_ListingsHost/HostRequests.html">Requests</Nav.Link>
    //                     <Nav.Link href="../Your_ListingsHost/HostCancellations.html">Approved</Nav.Link>
    //                     <Nav.Link href="../Your_ListingsHost/HostCancellations.html">Cancellations</Nav.Link>
    //                     <Nav.Link href="../Your_ListingsHost/HostCompleted.html">Completed</Nav.Link>
    //                     <Nav.Link href="../Your_ListingsHost/HostTerminated.html">Terminated</Nav.Link>
    //                     <Nav.Link href="../Your_ListingsHost/AllListings.html">All Listings</Nav.Link>
    //                 </Accordion.Body>
    //             </Accordion>
    //         </Nav>
    //     </Navbar.Collapse>
    // </Navbar>
