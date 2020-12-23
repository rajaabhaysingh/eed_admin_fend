import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      sticky="top"
      variant="dark"
    >
      <Link to="/" className="navbar-brand">
        eEd Admin
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Manage Student</Nav.Link>
          <Nav.Link href="#pricing">Manage Course</Nav.Link>
        </Nav>
        <Nav>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Admin Login / Signup
            </NavLink>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
