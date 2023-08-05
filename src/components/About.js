import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function About() {
  return (
   
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="text-center">
                <h1 className="display-4">Welcome to the About page</h1>
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