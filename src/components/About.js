import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../public/Styles.css';

export default function About() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black">
      <Container className="mx-auto" style={{ maxWidth: '100%' }}>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center">
              <h1
                className="about-Title mt-5 mb-4 text-white "
                style={{ textDecoration: 'underline', fontSize: '4rem' }}>
                About Us
              </h1>

              {/* Row of images */}
              <Row className="mb-4">
                <Col xs={4}>
                  <div className="about-image-container">
                    <img
                      src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="About Us"
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="about-image-container">
                    <img
                      src="https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="About Us"
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="about-image-container">
                    <img
                      src="https://images.pexels.com/photos/1894350/pexels-photo-1894350.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="About Us"
                      className="img-fluid"
                    />
                  </div>
                </Col>
              </Row>

              <div className="caption">
                Minimize Waste, Recycle, Innovate, Preserve Nature
              </div>

              <p
                className="lead mb-5 text-white"
                style={{
                  fontSize: '22px',
                }}>
                Welcome to our platform! We are dedicated to providing a
                seamless and secure experience for users to sell their unwanted
                goods locally. Our mission is to create a sustainable
                marketplace that fosters community engagement and promotes
                responsible consumption.
              </p>
              <div className="bg-black rounded p-4 mb-4">
                <h2
                  className=" about-Title text-white text-start display-4"
                  style={{ textDecoration: 'underline' }}>
                  Our Vision
                </h2>
                <p
                  className="text-white mb-0"
                  style={{
                    fontSize: '22px',
                  }}>
                  At our core, we envision a world where people can easily find
                  new homes for their pre-loved items, reducing waste and
                  minimizing the impact on the environment. We believe in the
                  power of local communities to support each other, and through
                  our platform, we aim to strengthen these bonds while promoting
                  sustainable living.
                </p>
              </div>

              <Row className="mb-4">
                <Col xs={4}>
                  <div className="about-image-container">
                    <img
                      src="https://images.pexels.com/photos/6118897/pexels-photo-6118897.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="About Us"
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="about-image-container">
                    <img
                      src="https://images.pexels.com/photos/15714745/pexels-photo-15714745/free-photo-of-merchandise-display-in-front-of-thrift-store.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="About Us"
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="about-image-container">
                    <img
                      src="https://images.pexels.com/photos/10335624/pexels-photo-10335624.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="About Us"
                      className="img-fluid"
                    />
                  </div>
                </Col>
              </Row>
              <div className="caption">
                Empower Local Trade, Embrace Diversity through Exchange,
                Transform Old into New Value
              </div>

              <div className="bg-black rounded p-4 mb-4">
                <h2
                  className="about-Title text-white text-end display-4"
                  style={{ textDecoration: 'underline' }}>
                  How It All Started
                </h2>
                <p
                  className="text-white mb-0"
                  style={{
                    fontSize: '22px',
                  }}>
                  Our journey began with a simple idea: to make selling and
                  buying local goods as effortless as possible. We noticed the
                  growing trend of people seeking alternatives to traditional
                  online marketplaces, and we saw an opportunity to create a
                  platform that caters specifically to the needs of local
                  communities.
                </p>
              </div>

              <div className="bg-black rounded p-4 mb-4">
                <h2
                  className="about-Title text-white text-start display-4"
                  style={{ textDecoration: 'underline' }}>
                  Our Values
                </h2>
                <Row className="mb-4">
                  <Col xs={12} md={6} lg={3} className="mb-4">
                    <li className="about-values-item text-white">
                      <span className="about-Sub-Title about-value-icon text-white">
                        Transparency:
                      </span>
                      <span className="about-value-content">
                        We value openness and honesty. Our platform is built on
                        a foundation of trust, ensuring that every user has a
                        safe and transparent experience.
                      </span>
                    </li>
                  </Col>

                  <Col xs={12} md={6} lg={3} className="mb-4">
                    <li className="about-values-item text-white">
                      <span className="about-Sub-Title about-value-icon text-white">
                        Community:
                      </span>
                      <span className="about-value-content">
                        {' '}
                        We are committed to building strong, vibrant
                        communities. Through our platform, users can connect
                        with their neighbors, fostering a sense of camaraderie
                        and support.
                      </span>
                    </li>
                  </Col>

                  <Col xs={12} md={6} lg={3} className="mb-4">
                    <li className="about-values-item">
                      <span className="about-Sub-Title about-value-icon text-white">
                        Sustainability:
                      </span>
                      <span className="about-value-content text-white">
                        {' '}
                        We care deeply about the environment and want to play
                        our part in reducing waste. By promoting the reuse of
                        goods, we strive to contribute to a greener future.
                      </span>
                    </li>
                  </Col>

                  <Col xs={12} md={6} lg={3} className="mb-4">
                    <li className="about-values-item">
                      <span className="about-Sub-Title about-value-icon text-white">
                        Convenience:
                      </span>
                      <span className="about-value-content text-white">
                        {' '}
                        Selling your unwanted items should be hassle-free. We've
                        designed our platform to be user-friendly, so you can
                        list your items quickly and easily.
                      </span>
                    </li>
                  </Col>
                  {/* ... (other columns) ... */}
                </Row>
              </div>

              <div className="bg-black rounded p-4 mb-4">
                <h2
                  className="text-white text-end display-4"
                  style={{ textDecoration: 'underline' }}>
                  Our Promise
                </h2>
                <p
                  className="text-white  mb-0"
                  style={{
                    fontSize: '18px',
                  }}>
                  As we grow, our commitment to our users remains unwavering. We
                  promise to continuously improve and refine our platform,
                  taking into account your valuable feedback. We are here to
                  listen and to ensure that your experience on our platform is
                  nothing short of exceptional.
                </p>
                <p
                  className="text-white mb-0"
                  style={{
                    fontSize: '18px',
                  }}>
                  Join us in our mission to create a thriving marketplace that
                  supports local communities and embraces sustainable practices.
                  Together, we can make a positive impact on the world, one item
                  at a time.
                </p>
              </div>

              <p
                className="text-white"
                style={{
                  fontSize: '18px',
                }}>
                Thank you for being a part of our journey.
              </p>
              <p
                className="text-white"
                style={{
                  fontSize: '24px',
                }}>
                Team TradeM
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
