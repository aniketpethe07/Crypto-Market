import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

export default function Cart() {
  const [cryptoData, setCryptoData] = useState(null);
  const [quantity, setQuantity] = useState(); // Initialize quantity to 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const response = await fetch(`http://localhost:4000/cart?id=${id}`);
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, maybe set an error state or show a message to the user
      }
    };

    fetchData();
  }, []);

  const footerRef = useRef(null);

  const handleScrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuantityChange = (event) => {
    // Update quantity state when input changes
    setQuantity(parseInt(event.target.value));
  };

  const handleCalculatePrice = () => {
    // Calculate price based on quantity and current price
    return cryptoData.market_data.current_price.usd * quantity;
  };

  return (
    <div>
      <Navbar scrollToFooter={handleScrollToFooter} />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center "
      >
        <Card
          className=" align-items-center m-5 vh-100"
          style={{
            width: "50rem",
            backgroundImage: "linear-gradient(60deg, #8e7dbe, #e0aaff)",
            color: "black",
          }}
        >
          {cryptoData && (
            <>
              <h1 className="text-center">{cryptoData.name}</h1>
              <p>
                {" "}
                <b>$</b> {cryptoData.market_data.current_price.usd}
              </p>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange} // Add onChange handler
                  placeholder="Quantity"
                />
              </div>
              <strong>Price: {handleCalculatePrice()}</strong>
            </>
          )}
        </Card>
      </Container>
      <Footer forwardedRef={footerRef} />
    </div>
  );
}
