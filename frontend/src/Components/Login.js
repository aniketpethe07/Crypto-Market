import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { loginContext } from '../Context/context';

axios.defaults.withCredentials = true; // Ensure credentials are sent with each request

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(loginContext);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password should be at least 8 characters long.");
        return;
      }

      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setLoggedIn(true);
        navigate("/home");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
      <div>
        <Card
          className="border"
          style={{
            backgroundImage: "linear-gradient(60deg, #f4f4f8, #33415c)",
          }}
        >
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="pb-4">Login</h1>
            <Form onSubmit={handleLogIn}>
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
