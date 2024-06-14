import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Info() {
  const [cryptoData, setCryptoData] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const response = await axios.get(`http://localhost:4000/info?id=${id}`);
        const { data, email } = response.data;
        setCryptoData(data);
        setLoading(false);
        setEmail(email)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onClickOnRow = (id) => {
    navigate(`/cart?id=${id}`);
  };

  const footerRef = useRef(null);

  const handleScrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure cryptoData is not null before accessing its properties
  if (!cryptoData) {
    return <div>No data available</div>;
  }

  // Destructure cryptoData safely
  const { name, image, symbol, hashing_algorithm, genesis_date, country_origin, market_data } = cryptoData;

  return (
    <div>
      <Navbar scrollToFooter={handleScrollToFooter} email={email}/>
      <Container fluid className="d-flex justify-content-center my-5 py-">
        <Card
          className="py-4"
          style={{
            width: "100%",
            maxWidth: "50rem",
            backgroundImage: "linear-gradient(60deg, var(--blue), var(--purple))",
            color: "black",
          }}
        >
          <h1 className="text-center">{name}</h1>
          <Row>
            <Col>
              {/* Safely access image.large */}
              {image && image.large && (
                <Card.Img
                  variant="top"
                  src={image.large}
                  alt={name}
                  style={{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              )}
            </Col>
            <Col>
              <Card.Body>
              <Card.Text style={{ display: 'block' }}>
                  <span><strong>Symbol:</strong> {symbol}</span><br />
                  <span><strong>Hashing Algorithm:</strong> {hashing_algorithm}</span><br />
                  <span><strong>Date of origin:</strong> {genesis_date}</span><br />
                  <span><strong>Country of origin:</strong> {country_origin || "Not available"}</span><br />
                  <span><strong>Current Price:</strong> ₹ {market_data && market_data.current_price && market_data.current_price.usd}</span><br />
                  <span><strong>Highest in 24HR:</strong> ₹ {market_data && market_data.high_24h && market_data.high_24h.usd}</span><br />
                  <span><strong>Lowest in 24HR:</strong> ₹ {market_data && market_data.low_24h && market_data.low_24h.usd}</span><br />
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
              Add to Cart
            </Button>
          </div>
        </Card>
      </Container>
      <Footer forwardedRef={footerRef} />
    </div>
  );
}
