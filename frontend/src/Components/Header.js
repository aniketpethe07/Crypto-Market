import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { TbHexagonLetterM } from "react-icons/tb";

export default function Header() {
  return (
    <Navbar style={{ backgroundColor: "#6610f2" }}>
      <Navbar.Brand className="mx-auto">
        <Link to="/" className="text-light text-decoration-none">
          <TbHexagonLetterM />
          Crypto Market
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
}
