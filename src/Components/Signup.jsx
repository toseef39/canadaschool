import React, { useState } from 'react';
import {
  Card, CardBody, CardHeader, Input, InputGroup,
  InputGroupText, FormGroup, Row, Col, CardFooter, Button
} from 'reactstrap';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import './signup.css';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("Register button clicked");
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <Card className="auth-card">
        <CardHeader className="auth-header">
          <div className="header-content">
            <FiUserPlus className="header-icon" />
            <h2 className="header-title">Create Account</h2>
            <p className="header-subtitle text-white">Join our platform to get started</p>
          </div>
        </CardHeader>

        <CardBody>
          <Row className="input-row">
            <Col xs="6" className="pe-1">
              <InputGroup>
                <InputGroupText><FaUser size={16} /></InputGroupText>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs="6" className="ps-1">
              <InputGroup>
                <InputGroupText><FaUser size={16} /></InputGroupText>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <FormGroup className="input-row">
            <InputGroup>
              <InputGroupText><FaEnvelope size={16} /></InputGroupText>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup className="input-row">
            <InputGroup>
              <InputGroupText><FaLock size={16} /></InputGroupText>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup className="input-row">
            <InputGroup>
              <InputGroupText><FaLock size={16} /></InputGroupText>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
        </CardBody>

        <CardFooter>
          <div className="d-grid gap-2">
            <Button className="auth-button" color="primary" onClick={handleRegister}>
              Register
            </Button>
            <Button className="auth-button" color="secondary" outline onClick={() => navigate("/login")}>
              I already have an account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
