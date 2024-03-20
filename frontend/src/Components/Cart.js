import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Cart() {
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
      <Container fluid style={{ textAlign: "center" }}>
        {cryptoData && (
          <>
            <h1>{cryptoData.name}</h1>

            <Card
              style={{
                display: "flex",
                justifyContent: "space-between",
                // width: "40%",
              }}
            >
              <Card.Img
                variant="top"
                src={cryptoData.image.large}
                alt={cryptoData.name}
                style={{
                  width: "15%",
                }}
              />
              <Card.Body>
                <Card.Title>{cryptoData.name}</Card.Title>
                <Card.Text>
                  <p>
                    <b>Name</b>: {cryptoData.name}
                  </p>
                  <p>
                    <b>Symbol</b>: {cryptoData.symbol}
                  </p>
                  <p>
                    <b>Hashing Algorithm</b>: {cryptoData.hashing_algorithm}
                  </p>
                  <p>
                    <b>Date of origin</b>: {cryptoData.genesis_date}
                  </p>
                  <p>
                    <b>Link</b>:{" "}
                    <a href={cryptoData.links.homepage[0]}>
                      {cryptoData.links.homepage[0]}
                    </a>
                  </p>
                  <p>
                    <b>Country of origin</b>:{" "}
                    {cryptoData.country_origin || "Not available"}
                  </p>
                  <p>
                    <b>Current Price</b>: ₹{" "}
                    {cryptoData.market_data.current_price.inr}
                  </p>
                  <p>
                    <b>Highest in 24HR</b>: ₹{" "}
                    {cryptoData.market_data.high_24h.inr}
                  </p>
                  <p>
                    <b>Lowest in 24HR</b>: ₹{" "}
                    {cryptoData.market_data.low_24h.inr}
                  </p>
                  <br />
                  <button>Buy</button>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
}
