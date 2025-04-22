import React, { useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const EnrollmentTable = () => {
  const [formDataList, setFormDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("enrollments")) || [];
    setFormDataList(savedData);
  }, []);

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Enrollment Records</h3>

      <div className="d-flex justify-content-between flex-wrap mb-3">
        <Button onClick={() => navigate("/home")} color="warning" className="mb-2 rounded-pill fw-semibold">
          Go Back to Form
        </Button>
        <Button onClick={() => navigate("/table")} color="success" className="mb-2 rounded-pill fw-semibold">
          View All Enrollments
        </Button>
      </div>

      {formDataList.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Payment</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course ID</th>
                <th>Package No</th>
                <th>Road Test</th>
                <th>License</th>
                <th>Instructor</th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.payment}</td>
                  <td>{entry.email}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.courseId}</td>
                  <td>{entry.packageNo}</td>
                  <td>{entry.roadTest}</td>
                  <td>{entry.license}</td>
                  <td>{entry.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-danger text-center mt-4">No data available.</p>
      )}
    </Container>
  );
};
