import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Hero() {
  return (
    <Container fluid className="p-0">
      <Row className="m-0 position-relative">
        <Col md={12} className="p-0">
          <img
            src="./Images/top-bg.jpg"
            alt=""
            className="w-100 vh-100 object-fit-cover"
            style={{ filter: "brightness(150%) contrast(80%)" }}
          />
        </Col>
        <Col md={6} className={`text-white text-center`}>
          <div className="position-absolute top-50 start-50 translate-middle">
            <h2>BE READY TO FLY WITH</h2>
            <h1>CryptoMarket</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat,
              eveniet eligendi repudiandae deleniti necessitatibus nemo
            </p>
            <Link to="/register">
              <Button style={{ backgroundColor: "#6610f2" }}>
                {" "}
                Create Account{" "}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
