import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios"; // Import Axios

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        setError("Password should be at least 8 characters long.");
        return;
      }

      const response = await axios.post("http://localhost:4000/register", {
        email,
        password,
      });

      if (response.status === 201) {
        alert("Account Created Successfully!");
        navigate("/login");
      } else {
        setError(response.data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-evenly vh-100"
      style={{
        backgroundImage: "linear-gradient(60deg, var(--blue), var(--purple))",
      }}
    >
      <div>
        <h1>CryptoMarket</h1>
        <p>
          Connect with CryptoMarket and get access up to 100+ Cryptocurrencies.
        </p>
      </div>
      <div className="">
        <Card
          className="border"
          style={{
            backgroundImage: "linear-gradient(60deg, #f4f4f8, #33415c)",
          }}
        >
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="pb-4">Register</h1>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  className="pt-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  className="pt-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <div className="d-flex justify-content-evenly pt-3">
                <Button className="border btn-dark" type="submit">
                  Register
                </Button>
                <Link to="/login">
                  <Button variant="secondary" className="border btn-dark">
                    Login
                  </Button>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
