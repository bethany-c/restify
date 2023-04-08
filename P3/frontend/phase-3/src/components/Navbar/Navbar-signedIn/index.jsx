import React from 'react'
import { Link } from 'react-router-dom'
import "../Navbar-dashboard/navbarstyle.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { BiHomeHeart, BiBell } from 'react-icons/bi';
import API from '../../API/apiservice';

const NavbarSI = () => {
    return (

    <Navbar variant="dark" expand="lg" className='w-100'>
        <Container>
            <Navbar.Brand href="../index.html">
                <BiHomeHeart id="nav-house-icon" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavDropdown" />
            <Navbar.Collapse id="navbarNavDropdown">
                <Nav className="me-auto">
                    <Nav.Link className="navbar-background" href="../Your_ListingsHost/AllListings.html">Become a Host!</Nav.Link>
                    <Nav.Link className="navbar-background" href="../Your_OrdersUser/UserApproved.html">My Reservations</Nav.Link>
                </Nav>
                <Nav className="right-nav">
                    <Nav.Item>
                        <Nav.Link className="navbar-background notif-link" data-bs-toggle="modal" data-bs-target="#modal-notif">
                            <BiBell className="navbar-background" />
                            <span className="badge-notification badge navbar-background" id="badge-notification">4</span>
                        </Nav.Link>
                    </Nav.Item>
                    <NavDropdown bg="primary" title="username" id="navbarDropdownMenuLink" className="navbar-background">
                        <NavDropdown.Item href="../Profile_pageBoth/ProfilePageDashboard.html">View Profile</NavDropdown.Item>
                        <NavDropdown.Item href="../Profile_pageBoth/EditProfilePageDashboard.html">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="../forms-Leo/listing.html">Create Listing</NavDropdown.Item>
                        <NavDropdown.Item href="../Your_OrdersUser/UserApproved.html">View Reservations</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="../Profile_pageBoth/ProfilePageDashboard.html">Help</NavDropdown.Item>
                        <NavDropdown.Item onClick={API.LogOutUser}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>





    )

}



export default NavbarSI