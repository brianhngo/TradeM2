import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypingEffect from "./TypingEffect";
import '../../public/Styles.css';

export default function Home() {
  useEffect(() => {
    const track = document.getElementById("image-track");
  
    let currentPercentage = 0;
  
    const animateImages = () => {
      currentPercentage -= 0.2
  
      track.style.transform = `translate(${currentPercentage}%, -50%)`;
  
      const images = track.getElementsByClassName("image");
      for (const image of images) {
        image.style.objectPosition = `${100 + currentPercentage}% center`;
      }
    };
  
    // Set up automatic animation
    const animationInterval = setInterval(animateImages, 16); // Adjust the interval as needed
  
    // Clean up interval on component unmount
    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className={`home min-vh-100 d-flex align-items-center justify-content-center`}>
      <div id="image-track">
        <img className="image" src="https://images.unsplash.com/photo-1689600570529-0e87f50e4687?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1525695230005-efd074980869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVjeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" draggable="false" />
        <img className="image" src="https://images.pexels.com/photos/2583836/pexels-photo-2583836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" draggable="false" />
        <img className="image" src="https://images.pexels.com/photos/6280474/pexels-photo-6280474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" draggable="false" />
       
        <div className="overlay"></div>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="welcome-text fade-in">
              <h1 className="display-3">
                Welcome to {" "}
                <span
                  className="display-2"
                  style={{ fontFamily: "Courier New, Courier, monospace" }}
                >
                  TradeM
                </span>
              </h1>
              <TypingEffect text="Sell Locally, Thrive Globally: Your Gateway to Sustainable Living." />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
