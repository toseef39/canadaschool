import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Components/HomePage';
import { Enrollmentform } from './Components/EnrollmentForm';
import { EnrollmentTable } from './Components/EnrollmentTable';
import StudentDetailsTable from './Components/StudentDetailsTable';
import Certifiedstudents from './Components/Certifiedstudents';
import Incompletestudents from './Components/Incompletestudents';
const AppContent = () => {
  const location = useLocation();

  // Define paths where BottomNavbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/enrollmentform" element={<Enrollmentform/>} />
        {/* <Route path="/table" element={<EnrollmentTable />} /> */}
        <Route path="/details" element={<StudentDetailsTable/>} />
        <Route path="/certifiedstudents" element={<Certifiedstudents/>} />
        <Route path="/Incompletestudents" element={<Incompletestudents/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<HomePage/>}/>
      </Routes>

      {/* {!shouldHideNavbar && <BottomNavbar />} */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
