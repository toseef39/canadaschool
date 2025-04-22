import React, { useState } from 'react';
import {
  Card, CardBody, CardHeader, Input, InputGroup,
  InputGroupText, FormGroup, CardFooter, Button
} from 'reactstrap';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import { signInWithEmailAndPassword } from "firebase/auth";
import './signup.css';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
  };


  return (
    <div className="signup-wrapper">
      <Card className="auth-card">
        <CardHeader className="auth-header">
          <div className="header-decorator"></div>
          <div className="header-content">
            <FiUserPlus className="header-icon" />
            <h2 className="header-title">Welcome</h2>
            <p className=" text-white">North Simcoe Driving School</p>
            <p className="text-white">(Encrypted Student Data Base)</p>
            {/* <p className="text-white">Login to your account</p> */}
          </div>
        </CardHeader>

        <CardBody>
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

          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
        </CardBody>

        <CardFooter>
          <div className="d-grid gap-2">
            <Button className="auth-button" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button className="auth-button" color="secondary" outline onClick={() => navigate("/signup")}>
              Create New Account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
