import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6}>
          <div>
            <h1>CryptoMarket</h1>
            <p>
              Connect with CryptoMarket and get access upto 100+
              Cryptocurrencies.
            </p>
          </div>
          <Card className="justify-content-center">
            <Card.Body>
              <h1>Register</h1>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    className="w-50"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    className="w-50"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleRegister}
                >
                  Register
                </Button>
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
