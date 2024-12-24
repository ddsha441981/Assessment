import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { forgotPassword } from '../services/authService';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      setMessage('');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setMessage('');
      return;
    }

    setError('');
    setMessage('Sending password reset link...');

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        setMessage('A password reset link has been sent to your email.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6" lg="4">
          <h2 className="text-center mb-4">Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            {error && <Alert color="danger">{error}</Alert>}
            {message && <Alert color="success">{message}</Alert>}

            <Button color="primary" block type="submit">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;
