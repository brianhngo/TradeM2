import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function About() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center">
              <h1 className="display-4 mt-5 text-white border border-light">
                About Us
              </h1>
              <p className="lead mb-5 text-white">
                Welcome to our platform! We are dedicated to providing a
                seamless and secure experience for users to sell their unwanted
                goods locally. Our mission is to create a sustainable
                marketplace that fosters community engagement and promotes
                responsible consumption.
              </p>
              <div className="info-section">
                <h2 className="text-white text-start ">Our Vision</h2>
                <p className="text-white mb-5 text-start">
                  At our core, we envision a world where people can easily find
                  new homes for their pre-loved items, reducing waste and
                  minimizing the impact on the environment. We believe in the
                  power of local communities to support each other, and through
                  our platform, we aim to strengthen these bonds while promoting
                  sustainable living.
                </p>
              </div>

              <div className="info-section">
                <h2 className="text-white text-end">How It All Started</h2>
                <p className="text-white mb-5 text-end">
                  Our journey began with a simple idea: to make selling and
                  buying local goods as effortless as possible. We noticed the
                  growing trend of people seeking alternatives to traditional
                  online marketplaces, and we saw an opportunity to create a
                  platform that caters specifically to the needs of local
                  communities.
                </p>
              </div>

              <div className="info-section">
                <h2 className="text-white text-start">Our Values</h2>
                <ul className="text-white mb-5 text-start">
                  <li>
                    Transparency: We value openness and honesty. Our platform is
                    built on a foundation of trust, ensuring that every user has
                    a safe and transparent experience.
                  </li>
                  <li>
                    Community: We are committed to building strong, vibrant
                    communities. Through our platform, users can connect with
                    their neighbors, fostering a sense of camaraderie and
                    support.
                  </li>
                  <li>
                    Sustainability: We care deeply about the environment and
                    want to play our part in reducing waste. By promoting the
                    reuse of goods, we strive to contribute to a greener future.
                  </li>
                  <li>
                    Convenience: Selling your unwanted items should be
                    hassle-free. We've designed our platform to be
                    user-friendly, so you can list your items quickly and
                    easily.
                  </li>
                </ul>
              </div>
              <div className="info-section">

              <h2 className="text-white text-end">
                Our Promise
              </h2>
              <p className="text-white text-end">
                As we grow, our commitment to our users remains unwavering. We
                promise to continuously improve and refine our platform, taking
                into account your valuable feedback. We are here to listen and
                to ensure that your experience on our platform is nothing short
                of exceptional.
              </p>
              <p className="text-white mb-5 text-end">
                Join us in our mission to create a thriving marketplace that
                supports local communities and embraces sustainable practices.
                Together, we can make a positive impact on the world, one item
                at a time.
              </p>


              </div>
             
              <p className="text-white">
                Thank you for being a part of our journey.
              </p>
              <p className="text-white">Team TradeM</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
