import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Info() {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const id = url.searchParams.get("id");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
        // style={{  }}
      >
        {cryptoData && (
          <Card
            style={{
              width: "50rem",
              backgroundColor: "#4895ef",
              color: "white",
            }}
          >
            <h1 className="text-center">{cryptoData.name}</h1>
            <Row>
              <Col>
                <Card.Img
                  variant="top"
                  src={cryptoData.image.large}
                  alt={cryptoData.name}
                  style={{ width: "50%", paddingLeft: "40px" }}
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
                      {cryptoData.market_data.current_price.inr}
                    </p>
                    <p>
                      Highest in 24HR: ₹ {cryptoData.market_data.high_24h.inr}
                    </p>
                    <p>
                      Lowest in 24HR: ₹ {cryptoData.market_data.low_24h.inr}
                    </p>
                  </Card.Text>

                  <Link to="/cart">
                    <Button>Buy</Button>
                  </Link>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
      </Container>
      <Footer/>
    </div>
  );
}
