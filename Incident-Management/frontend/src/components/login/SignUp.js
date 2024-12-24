import React, { useState } from "react";
import {Button,Form,FormGroup,Label,Input,Container,Row,Col,} from "reactstrap";
import { signup } from "../services/authService";
import { PincodeService } from "../services/pincodeService";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handlePincodeChange = async (e) => {
    const inputPincode = e.target.value;
    setPinCode(inputPincode);

    if (inputPincode.length === 6) {
      try {
        const locationData = await PincodeService.getLocationByPincode(inputPincode); 
        setCountry(locationData.country || "Not found");
        setState(locationData.state || "Not found");
        setCity(locationData.city || "Not found");
      } catch (error) {
        alert(`Error fetching location: ${error.message || error}`);
        setCountry("");
        setState("");
        setCity("");
      }
    } else {
      setCountry("");
      setState("");
      setCity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName,
      email,
      phone,
      address,
      password,
      pinCode,
      country,
      state,
      city,
    };

    try {
      const response = await signup(userData);
      alert("Signup successful!");
      console.log(response);
    } catch (error) {
      alert(`Signup failed: ${error.message || error}`);
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center">
      <div
        className="border rounded p-4 mt-5 shadow-sm"
        style={{
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <h2 className="text-center mb-4">Sign Up Here</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="userName">Username</Label>
                <Input
                  type="text"
                  id="userName"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type="textarea"
                  id="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="pincode">Pincode</Label>
                <Input
                  type="text"
                  id="pinCode"
                  placeholder="Enter your pincode"
                  value={pinCode}
                  onChange={handlePincodeChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                  type="text"
                  id="country"
                  placeholder="Country"
                  value={country}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="text"
                  id="state"
                  placeholder="State"
                  value={state}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={city}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>

          <Button color="primary" type="submit" block>
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
