import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useMediaQuery } from 'react-responsive';
import LoginPage from '../Forms/LoginPage';
import '../../public/Styles.css';
import { auth } from '../firebase';
export default function navbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
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
        expand="lg"
        style={{ padding: '10px 0', height: '60px', backgroundColor: 'black' }}
        sticky="top">
        <Container>
          <Navbar.Brand className={`nav-title text-white fs-4 `} href="/home">
            TradeM
          </Navbar.Brand>

          {isSmallScreen || isMediumScreen ? (
            <>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav "
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
                      className="nav-link  fs-1 my-3 text-white"
                      href="/home">
                      Home
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link fs-1 my-3 text-white"
                      href="/about">
                      About
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link fs-1 my-3 text-white"
                      href="/map">
                      Map
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link fs-1 my-3 text-white"
                      href="/products">
                      Products
                    </Nav.Link>

                    <Nav.Link
                      className="nav-link fs-1 my-3 text-white"
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
              <Nav className="d-flex align-items-center justify-content-end">
                <Nav.Link
                  href="/home"
                  className="nav-link fs-5 me-5 text-white">
                  Home
                </Nav.Link>
                <Nav.Link
                  href="/about"
                  className="nav-link fs-5 me-5 text-white">
                  About
                </Nav.Link>

                <Nav.Link
                  className="nav-link fs-5 me-5 text-white"
                  href="/products">
                  Products
                </Nav.Link>

                <Nav.Link href="/map" className="nav-link fs-5 me-5 text-white">
                  Map
                </Nav.Link>
                {user ? (
                  <Nav.Link
                    href="/profile"
                    className="nav-link fs-5 me-5 text-white">
                    Profile
                  </Nav.Link>
                ) : null}
                {/* Conditional rendering of login/logout button */}
                <div className="ms-auto d-flex align-items-center">
                  {user ? (
                    <>
                      <Nav.Link
                        href="/home"
                        className="nav-link fs-5 me-5 text-white"
                        onClick={handleLogout}>
                        Logout
                      </Nav.Link>
                      <Nav.Link
                        href="/chatlist"
                        className="nav-link fs-5 me-5 text-white">
                        ChatList
                      </Nav.Link>
                    </>
                  ) : (
                    <Nav.Link
                      href="/login"
                      className="nav-link fs-5 me-5 text-white">
                      Login
                    </Nav.Link>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
}
