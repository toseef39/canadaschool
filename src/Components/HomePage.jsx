import React from 'react';
import NavbarComponent from '../common/Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample data for graphs
const studentData = [
    { name: 'Jan', total: 120, certified: 80 },
    { name: 'Feb', total: 150, certified: 95 },
    { name: 'Mar', total: 180, certified: 120 },
    { name: 'Apr', total: 200, certified: 150 },
    { name: 'May', total: 240, certified: 180 },
    { name: 'Jun', total: 280, certified: 210 },
];

const earningsData = [
    { name: 'Jan', earnings: 12000 },
    { name: 'Feb', earnings: 15000 },
    { name: 'Mar', earnings: 18000 },
    { name: 'Apr', earnings: 20000 },
    { name: 'May', earnings: 24000 },
    { name: 'Jun', earnings: 28000 },
];

const incompleteStudentsData = [
    { name: 'Theory', value: 15 },
    { name: 'Practice', value: 25 },
    { name: 'Road Test', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const HomePage = () => {
    return (
        <div className="bg-light">
            <NavbarComponent />

            <Container className="py-4">
                <Card className="mb-4 shadow-sm border-0">
                    <Card.Body className="text-center bg-primary text-white rounded">
                        <h2>Welcome to North Simcoe Driving School</h2>
                        <p className="mb-0">(Encrypted Student Data Base)</p>
                    </Card.Body>
                </Card>

                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <Form.Group controlId="search">
                                    <Form.Control type="text" placeholder="Search students..." />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="filter">
                                    <Form.Select>
                                        <option>Filter by...</option>
                                        <option>Certified</option>
                                        <option>In Progress</option>
                                        <option>New</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Graphs Section */}
                <Row className="g-4">
                    <Col lg={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>Total vs Certified Students</Card.Title>
                                <div style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={studentData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="total" fill="#8884d8" name="Total Students" />
                                            <Bar dataKey="certified" fill="#82ca9d" name="Certified" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>Total Earnings</Card.Title>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Select size="sm">
                                            <option>All Months</option>
                                            <option>January</option>
                                            <option>February</option>
                                            <option>March</option>
                                            <option>April</option>
                                            <option>May</option>
                                            <option>June</option>
                                            <option>July</option>
                                            <option>August</option>
                                            <option>September</option>
                                            <option>October</option>
                                            <option>November</option>
                                            <option>December</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Select size="sm">
                                            <option>2025</option>
                                            <option>2024</option>
                                            <option>2023</option>
                                            <option>2022</option>
                                            <option>2021</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <div style={{ height: '250px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={earningsData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="earnings" fill="#ffc658" name="Earnings ($)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>Incomplete Students</Card.Title>
                                <div style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={incompleteStudentsData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {incompleteStudentsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Access Database Button */}
                    <Col lg={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <h4 className="mb-4">Access Students Database</h4>
                                <Button variant="primary" size="lg" className="px-5">
                                    View Database
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;