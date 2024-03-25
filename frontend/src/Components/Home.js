import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [cryptoData, setCryptoData] = useState([]);
  const navigate = useNavigate();

  const onClickOnRow = (id) => {
    navigate(`/info?id=${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/home");
        const data = await response.json();

        // Ensure that data is an array before setting the state
        if (Array.isArray(data)) {
          setCryptoData(data);
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error.message);
      }
    };

    fetchData();
  }, []);

  const footerRef = useRef(null);

  const handleScrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar scrollToFooter={handleScrollToFooter} />
      <Container>
        <h1 className="py-5">Today's Cryptocurrency Prices</h1>
        <Table bordered hover responsive>
          <thead className="table-primary">
            <tr
              className="cursor-pointer"
              style={{
                backgroundImage: "linear-gradient(60deg, #9d4edd, #c8b6ff)",
              }}
            >
              <th>Rank</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Total Volume</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr>
                <td>{crypto.market_cap_rank}</td>

                <td
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => onClickOnRow(crypto.id)}
                >
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    height={40}
                    width={40}
                  />
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => onClickOnRow(crypto.id)}
                >
                  {crypto.name}
                </td>
                <td>
                  <b>$ </b>
                  {crypto.current_price}
                </td>
                <td>
                  <b>$ </b>
                  {crypto.market_cap}
                </td>
                <td>
                  <b>$ </b>
                  {crypto.total_volume}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer forwardedRef={footerRef} />
    </>
  );
}
