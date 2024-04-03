import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

export default function Info() {
  const [cryptoData, setCryptoData] = useState(null);

  const navigate = useNavigate();

  const onClickOnRow = (id) => {
    navigate(`/cart?id=${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const response = await axios.get(`http://localhost:4000/info?id=${id}`);
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const footerRef = useRef(null);

  const handleScrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar scrollToFooter={handleScrollToFooter} />
      <Container fluid className="d-flex justify-content-center my-5 py-">
        {cryptoData && (
          <Card
            className=" py-4"
            style={{
              width: "100%", // Adjust width to fit the container
              maxWidth: "50rem", // Limit maximum width to avoid excessive width on larger screens
              backgroundImage:
                "linear-gradient(60deg, var(--blue), var(--purple))",
              color: "black",
            }}
          >
            <h1 className="text-center">{cryptoData.name}</h1>
            <Row>
              <Col>
                <Card.Img
                  variant="top"
                  src={cryptoData.image.large}
                  alt={cryptoData.name}
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }} // Center the image
                />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Text>
                    <p>Symbol: {cryptoData.symbol}</p>
                    <p>Hashing Algorithm: {cryptoData.hashing_algorithm}</p>
                    <p>Date of origin: {cryptoData.genesis_date}</p>
                    <p>
                      Country of origin:{" "}
                      {cryptoData.country_origin || "Not available"}
                    </p>
                    <p>
                      Current Price: ₹{" "}
                      {cryptoData.market_data.current_price.usd}
                    </p>
                    <p>
                      Highest in 24HR: ₹ {cryptoData.market_data.high_24h.usd}
                    </p>
                    <p>
                      Lowest in 24HR: ₹ {cryptoData.market_data.low_24h.usd}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button
                variant="dark"
                className=""
                key={cryptoData.id}
                onClick={() => onClickOnRow(cryptoData.id)}
                style={{ width: "25%" }}
              >
                Dark
              </Button>
            </div>
          </Card>
        )}
      </Container>
      <Footer forwardedRef={footerRef} />
    </div>
  );
}
