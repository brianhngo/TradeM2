import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypingEffect from "./TypingEffect";
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
        
        https://vod-progressive.akamaized.net/exp=1691441601~acl=%2Fvimeo-transcode-storage-prod-us-west1-h264-2160p%2F01%2F3751%2F14%2F368757701%2F1526557474.mp4~hmac=49923779caf680ed2feddb03d22977398b365e8e1081d7ed4bf5ec35743e24ae/vimeo-transcode-storage-prod-us-west1-h264-2160p/01/3751/14/368757701/1526557474.mp4?download=1&filename=video+%282160p%29.mp4"
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
