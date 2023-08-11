import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useMediaQuery } from 'react-responsive';
import LoginPage from '../Forms/LoginPage';
import './Styles.css';
import { auth } from '../firebase';
export default function navbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const [darkMode, setDarkMode] = useState(true);

  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <Navbar
        bg={darkMode ? 'dark' : 'light'}
        data-bs-theme="dark"
        expand="lg"
        variant={darkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand
            className={`nav-title  fs-4 ${darkMode ? '' : 'navbar-light'}`}
            href="/home">
            TradeM
          </Navbar.Brand>

          {isSmallScreen || isMediumScreen ? (
            <>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={handleOffcanvasToggle}
              />
              <Offcanvas
                className="bg-black"
                show={showOffcanvas}
                onHide={handleOffcanvasToggle}>
                <Offcanvas.Header
                  className="justify-content-center border-bottom border-light"
                  closeButton>
                  <Offcanvas.Title className="offcanvas-nav-title fs-4 text-light">
                    Trade Market
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvas-panel">
                  <Nav className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <Nav.Link
                      className="btn text-secondary fs-2 fw-light hover-effect my-3"
                      href="/home">
                      Home
                    </Nav.Link>
                    <Nav.Link
                      className="btn text-secondary fs-2 fw-light hover-effect my-3"
                      href="/about">
                      About
                    </Nav.Link>
                    <Nav.Link
                      className="btn text-secondary fs-2 fw-light hover-effect my-3"
                      href="/map">
                      Map
                    </Nav.Link>
                    <Nav.Link
                      className="btn text-secondary fs-2 fw-light hover-effect my-3"
                      href="/products">
                      Products
                    </Nav.Link>

                    <Nav.Link
                      className="btn text-primary fs-2 fw-light hover-effect my-3"
                      href="/login">
                      Login
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          ) : (
            // Regular Navbar for medium and large screens
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end">
                <Nav.Link href="/home" className="fs-5 me-4">
                  Home
                </Nav.Link>
                <Nav.Link href="/about" className="fs-5 me-4">
                  About
                </Nav.Link>
                {/* Conditional rendering of login/logout button */}
                {user ? (
                  <Nav.Link
                    href="/home"
                    className="fs-5 me-4"
                    onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login" className="fs-5 me-4">
                    Login
                  </Nav.Link>
                )}
                <Nav.Link href="/map" className="fs-5 me-4">
                  Map
                </Nav.Link>
                {user ? (
                  <Nav.Link href="/profile" className="fs-5 me-4">
                    Profile
                  </Nav.Link>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
        <div className="mr-auto ">
          <button
            className="btn btn-link text-light ms-auto"
            onClick={toggleDarkMode}>
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-moon-fill"
                viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-brightness-high-fill"
                viewBox="0 0 16 16">
                <path
                  d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
                  fill="black"
                />
              </svg>
            )}
          </button>
        </div>
      </Navbar>
    </>
  );
}
