import React from 'react'
// import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import "../Navbar-dashboard/navbarstyle.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { BiHomeHeart, BiBell } from 'react-icons/bi';
import LogIn from '../../login';
import { Link } from 'react-router-dom';
const NavbarSO = () => {
    
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
                    </Nav>
                    <Nav className="right-nav">
                        <Nav.Item>
                            <Nav.Link className="navbar-background notif-link" data-bs-toggle="modal" data-bs-target="#modal-notif">
                                <BiBell className="navbar-background" />
                                <span className="badge-notification badge navbar-background" id="badge-notification">4</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} className="navbar-background" to="login">Log In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} className="navbar-background" to="/signup">Sign Up!</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>

    </Navbar>





    )

}



export default NavbarSO