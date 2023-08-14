import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypingEffect from "./TypingEffect";
import "./Styles.css";

export default function Home() {
  return (
    <div className={`bg-white min-vh-100 d-flex align-items-center justify-content-center`}>
       
       
    
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="text-black fade-in">
              <h1 className="display-3 ">
                Welcome to {" "}
                <span
                  className="display-2"
                  style={{ fontFamily: "Courier New, Courier, monospace" }}
                >
                  TradeM
                </span>
              </h1>
              <TypingEffect  text="Sell Locally, Thrive Globally: Your Gateway to Sustainable Living." />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
