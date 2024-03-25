import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function CustomNavbar({ scrollToFooter }) {
  return (
    <Navbar
      className="d-flex justify-content-between"
      style={{
        backgroundImage: "linear-gradient(60deg, #9d4edd, #c8b6ff)",
      }}
    >
      <Navbar.Brand
        as={Link}
        to="/home"
        className="px-4 "
        style={{ color: "black" }}
      >
        <h3>Crypto Market</h3>
      </Navbar.Brand>
      <Nav className="px-4">
        <Nav.Link as={Link} to="/home" style={{ color: "black" }}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} onClick={scrollToFooter} style={{ color: "black" }}>
          About
        </Nav.Link>
        <Nav.Link as={Link} to="/" style={{ color: "black" }}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
