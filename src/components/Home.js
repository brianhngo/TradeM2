import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
   
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
    <video
      autoPlay
      loop
      muted
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1",
      }}
    >
    <source
        src="
       
        https://vod-progressive.akamaized.net/exp=1691281127~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3751%2F14%2F368755148%2F1526543257.mp4~hmac=f2ba377a55f6b55b35de7cbdb1a4979406c2225216348c565ed2502d77f3c5a5/vimeo-prod-skyfire-std-us/01/3751/14/368755148/1526543257.mp4?download=1&filename=video+%28720p%29.mp4"
        type="video/mp4"
        allowFullScreen
      />
    </video>
        
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="text-center">
                <h1 className="display-4">Welcome to Trade M Home</h1>
                <p className="lead">
                  "Sell Locally, Thrive Globally: Your Gateway to Sustainable
                  Living."
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      

  );
}
