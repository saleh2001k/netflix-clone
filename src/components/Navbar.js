import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import './Navbar.css';

const Navbar = () => {
  return (
    <BootstrapNavbar expand="lg">
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" style={{ color: 'red' }}>Home</Nav.Link>
          <Nav.Link as={Link} to="/favorites" style={{ color: 'red' }}>Favorites</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
