import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypingEffect from "./TypingEffect";
import '../../public/Styles.css';

export default function Home() {
  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
      if (track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
      
      const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      
      track.dataset.percentage = nextPercentage;
      
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      
      for (const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    }

    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = e => handleOnDown(e);

    window.ontouchstart = e => handleOnDown(e.touches[0]);

    window.onmouseup = e => handleOnUp(e);

    window.ontouchend = e => handleOnUp(e.touches[0]);

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);
  }, []);

  return (
    <div className={`home min-vh-100 d-flex align-items-center justify-content-center`}>
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <img className="image" src="https://images.unsplash.com/photo-1689600570529-0e87f50e4687?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" draggable="false" />
        <img className="image" src="https://images.unsplash.com/photo-1525695230005-efd074980869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVjeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" draggable="false" />
        <img className="image" src="https://images.pexels.com/photos/2583836/pexels-photo-2583836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" draggable="false" />
        {/* ... Add other image elements similarly */}
        <div className="overlay"></div>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="welcome-text fade-in">
              <h1 className="display-3 ">
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
