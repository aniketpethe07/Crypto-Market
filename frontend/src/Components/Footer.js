import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <footer>
      <Container
        fluid
        className="text-light text-center"
        style={{ backgroundColor: "#6610f2" }}
      >
        <Row>
          <Col xs={12} md={6}>
            <div>
              <h1>CryptoMarket</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1>Contact CryptoMarket</h1>
              <p>Phone: 1234567890</p>
              <p>Address: XYZ</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
