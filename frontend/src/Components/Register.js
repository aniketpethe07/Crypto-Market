import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
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

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Account Created Successfully!");
        navigate("/login");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // Validation functions
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
      style={{ backgroundImage: "linear-gradient(60deg, #9d4edd, #c8b6ff)" }}
    >
      <div>
        <h1>CryptoMarket</h1>
        <p>
          Connect with CryptoMarket and get access upto 100+ Cryptocurrencies.
        </p>
      </div>
      <div className="">
        <Card>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="pb-4">Register</h1>
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
                  className="text-dark"
                  type="submit"
                  onClick={handleRegister}
                >
                  Register
                </Button>
                <Link to="/login">
                  <Button variant="secondary" className="text-dark">
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
