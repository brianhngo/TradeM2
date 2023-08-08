import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypingEffect from "./TypingEffect";
import './Styles.css'; 
export default function Home() {
  return (
   
    <div className="min-vh-100 d-flex align-items-center justify-content-center">

      {/* overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          zIndex: "-1",
        }}
      />

    <video
      autoPlay
      loop
      muted
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-2",
      }}
    >
    <source
        src="
        
        https://static.videezy.com/system/resources/previews/000/005/087/original/Organic_Lines_4K_Motion_Background_Loop.mp4"
        type="video/mp4"
        allowFullScreen
      />
    </video>
        
        <Container>
          <Row className="justify-content-start">
            <Col xs={12} md={8} lg={6}>
              <div className="text-white fade-in">
                <h1 className="display-3 ">Welcome to <span className="display-2" style={{ fontFamily:  'Courier New, Courier, monospace' }}>TradeM</span></h1>
                <TypingEffect
                text=  "Sell Locally, Thrive Globally: Your Gateway to Sustainable Living."
              />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      

  );
}
