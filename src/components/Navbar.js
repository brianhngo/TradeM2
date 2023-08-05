import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import LoginPage from "../Forms/LoginPage";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useMediaQuery } from "react-responsive";

export default function navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 991 });


  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand  className="nav-title fs-4" href="/home">TradeM</Navbar.Brand>
          {isSmallScreen || isMediumScreen ? (
            <>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={handleOffcanvasToggle}
              />
              <Offcanvas show={showOffcanvas} onHide={handleOffcanvasToggle}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title className="offcanvas-nav-title">Trade Market</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvas-panel">
                  <Nav className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <Nav.Link className="text-secondary fs-2 fw-light hover-effect my-3" href="/home">Home</Nav.Link>
                    <Nav.Link className="text-secondary fs-2 fw-light hover-effect my-3" href="/about">About</Nav.Link>
                    <Nav.Link className="text-secondary fs-2 fw-light hover-effect my-3" href="/map">Map</Nav.Link>
                    <Nav.Link className="text-primary fs-2 fw-light hover-effect my-3" onClick={handleLoginModalOpen}>Login</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          ) : (
            // Regular Navbar for medium and large screens
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto mx-auto">
                <Nav.Link href="/home" className="fs-5 me-4">Home</Nav.Link>
                <Nav.Link href="/about" className="fs-5 me-4">About</Nav.Link>
                <Nav.Link onClick={handleLoginModalOpen} className="fs-5 me-4">Login</Nav.Link>
                <Nav.Link href="/map" className="fs-5 me-4">Map</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>

      <LoginPage show={showLoginModal} handleClose={handleLoginModalClose} />
    </>
  );
}
