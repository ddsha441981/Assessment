import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { signin } from '../services/authService';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${email}:${password}`);
    localStorage.setItem('auth', credentials); 

    try {
      const data = await signin(email, password);
      console.log(data);
      localStorage.setItem('userId', data.userId);
      console.log('Login successful:', data);  
      navigate('/dashboard');  
    } catch (error) {
      setError(error.message);  
      console.log('Login failed:', error.message);
    }
  };


  return (
    <Container className="min-vh-100 d-flex justify-content-center">
      <div
        className="border rounded p-4 mt-5 shadow-sm"
        style={{
          maxWidth: '500px',
          width: '50%',
          height: '500px',
          backgroundColor: '#fff',
        }}
      >
        <h2 className="text-center mb-4">Sign In Here</h2>

        {error && (
          <div className="alert alert-danger">{error}</div> 
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <Button color="primary" type="submit" block>
            Submit
          </Button>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/signup" className="text-primary text-decoration-none">
              Don't have an account? Sign Up Here
            </Link>
            <Link to="/forgot_password" className="text-primary text-decoration-none">
              Forgot Password
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;