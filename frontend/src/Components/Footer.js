import React from "react";
import Container from "react-bootstrap/Container";

export default function Footer({ forwardedRef }) {
  return (
    <footer ref={forwardedRef}>
      <Container
        fluid
        className="text-dark d-flex justify-content-between align-items-center"
        style={{
          backgroundImage: "linear-gradient(60deg, #9d4edd, #c8b6ff)",
          padding: "20px", // Add padding to the footer container
        }}
      >
        <div>
          <h1>CryptoMarket</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            optio amet, quibusdam natus volupt
          </p>
        </div>
        <div style={{ marginLeft: "20px" }}>
          {" "}
          {/* Add margin-left */}
          <h1>Contact CryptoMarket</h1>
          <p>Phone: 1234567890</p>
          <p>Address: XYZ</p>
        </div>
      </Container>
    </footer>
  );
}
