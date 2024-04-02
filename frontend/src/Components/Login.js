import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    try {
      e.preventDefault(); // Prevent the form submission

      // Add your validation logic here
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password should be at least 8 characters long.");
        return;
      }

      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    // Use a regular expression or other validation logic
    // Example regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Add your password validation logic here
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
          Connect with CryptoMarket and get access upto 100+ Cryptocurrencies.
        </p>
      </div>
      <div>
        <Card
          className="border"
          style={{
            backgroundImage: "linear-gradient(60deg, #f4f4f8, #33415c)",
          }}
        >
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="pb-4">Login</h1>
            <Form>
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

              <div className="d-flex justify-content-evenly pt-3">
                <Button
                  className="border btn-dark"
                  variant="primary"
                  type="submit"
                  onClick={handleLogIn}
                >
                  Login
                </Button>
                <Link to="/register">
                  <Button variant="secondary" className="border btn-dark">
                    Register
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
