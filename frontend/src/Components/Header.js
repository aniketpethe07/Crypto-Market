import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { TbHexagonLetterM } from "react-icons/tb";

export default function Header() {
  return (
    <Navbar
      style={{
        backgroundImage: "linear-gradient(60deg, var(--blue), var(--purple))",
      }}
    >
      <Navbar.Brand className="mx-auto">
        <Link to="/" className="text-dark text-decoration-none">
          <TbHexagonLetterM />
          Crypto Market
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
}
