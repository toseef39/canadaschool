import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../assets/images/SchoolLogo.webp";

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Top Contact Bar - hidden on mobile */}
            <div className=" py-2 d-none d-md-block">
                <Container>

                    {/* <div className="d-none d-md-flex flex-column text-end">
                        <div className=" fw-medium">
                            <span className="me-3">
                                <i className="bi bi-telephone-fill me-1"></i>
                                <strong>Call:</strong>{' '}
                                <a href="tel:4168385951" className="text-danger text-decoration-none">(416) 838-5951</a>
                            </span>
                        </div>
                        <div className=" fw-medium">
                            <span>
                                <i className="bi bi-envelope-fill me-1"></i>
                                <strong>Email:</strong>{' '}
                                <a href="mailto:north.simcoe.driving@gmail.com" className="text-danger text-decoration-none">north.simcoe.driving@gmail.com</a>
                            </span>
                        </div>
                    </div> */}
                </Container>
            </div>

            {/* Main Navigation */}
            <Navbar color="white" light expand="md" className="shadow-sm">
                <Container className="flex-column flex-md-row">
                    {/* Logo and Brand - full width on mobile */}
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <NavbarBrand href="/" className="me-0">
                            <div className="d-flex align-items-center">
                                <img
                                    src={Logo}
                                    alt="North Simcoe Driving School Logo"
                                    height="60"
                                    className="me-2"
                                />
                            </div>
                        </NavbarBrand>

                        {/* Mobile Toggle */}
                        <NavbarToggler onClick={toggle} className="ms-auto border-0 d-md-none">
                            <span className="navbar-toggler-icon"></span>
                        </NavbarToggler>
                    </div>

                    {/* Navigation Links - full width stacked on mobile */}
                    <Collapse isOpen={isOpen} navbar className="w-100">
                        <Nav navbar className="flex-column flex-md-row mt-3 mt-md-0">
                            <NavItem>
                                <NavLink href="/home" className="px-0 px-md-3 py-2 py-md-0 fw-medium">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/enrollmentform" className="px-0 px-md-3 py-2 py-md-0 fw-medium">Enroll New Student</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/certifiedstudents" className="px-0 px-md-3 py-2 py-md-0 fw-medium">Certified Students</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Incompletestudents" className="px-0 px-md-3 py-2 py-md-0 fw-medium">Incomplete Students</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#registration" className="px-0 px-md-3 py-2 py-md-0 fw-medium">Download Student Record</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/details" className="px-0 px-md-3 py-2 py-md-0 fw-medium">Access Students Data Base</NavLink>
                            </NavItem>
                            
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;