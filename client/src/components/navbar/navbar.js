import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navbar.css';




const Navs = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>E-commerce</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Items</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/sales">Sales</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navs