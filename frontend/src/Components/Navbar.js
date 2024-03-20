import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function CustomNavbar(props) {
  return (
    <Navbar
      className="d-flex justify-content-space"
      style={{ backgroundColor: "#6610f2" }}
    >
      <Navbar.Brand as={Link} to="/home" style={{ color: "white" }}>
        <h3>Crypto Market</h3>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home" style={{ color: "white" }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/aboutUs" style={{ color: "white" }}>
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/" style={{ color: "white" }}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
