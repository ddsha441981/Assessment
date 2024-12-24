import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col md="6" className="text-center text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} Incident Management System</p>
          </Col>
          <Col md="6" className="text-center text-md-end">
            <a href="https://example.com" className="text-white text-decoration-none me-2">
              Privacy Policy
            </a>
            <a href="https://example.com" className="text-white text-decoration-none">
              Terms of Service
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
