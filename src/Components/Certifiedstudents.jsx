import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Badge,
  Input,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { db } from "../FirebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import NavbarComponent from "../common/Navbar";

const statusColors = {
  "In Progress": "warning",
  Incomplete: "danger",
  Certified: "success",
};

const Certifiedstudents = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "enrollments"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnrollments(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const docRef = doc(db, "enrollments", id);
      await updateDoc(docRef, { status: newStatus });

      setEnrollments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      setFilteredData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    toggleModal();
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  useEffect(() => {
    const filtered = enrollments.filter((item) => {
      const matchesSearch = Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredData(filtered);
  }, [searchTerm, enrollments, statusFilter]);

  const mobileColumns = [
    {
      name: "Student",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="me-3 bg-light rounded-circle p-2">
            <FaGraduationCap className="text-primary" />
          </div>
          <div>
            <div className="fw-bold">{row.name}</div>
            <small className="text-muted">{row.courseId}</small>
          </div>
        </div>
      ),
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Status",
      cell: (row) => (
        <Badge
          color={statusColors[row.status || "In Progress"]}
          className="rounded-pill"
        >
          {row.status || "In Progress"}
        </Badge>
      ),
      center: true,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          color="link"
          size="sm"
          onClick={() => handleViewDetails(row)}
          className="text-primary"
        >
          <FiEye size={18} />
        </Button>
      ),
      center: true,
      width: "80px",
    },
  ];

  const desktopColumns = [
    {
      name: "Course",
      selector: (row) => row.courseId,
      sortable: true,
      width: "120px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "150px",
    },
    {
      name: "Payment",
      selector: (row) => `$${row.payment || 0}`,
      sortable: true,
      right: true,
      width: "120px",
    },
    {
      name: "PackageNo",
      selector: (row) => `${row.packageNo || 0}`,
      sortable: true,
      right: true,
      width: "150px",
    },
    {
      name: "License",
      selector: (row) => `${row.license || 0}`,
      sortable: true,
      right: true,
      width: "150px",
    },
    {
      name: "Road Test",
      cell: (row) => (
        <Input
          type="select"
          value={row.roadTest === "Yes" ? "Yes" : "No"}
          onChange={(e) => handleRoadTestChange(row.id, e.target.value)}
          bsSize="sm"
          className="bg-light"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Input>
      ),
      sortable: true,
      width: "150px",
    },
    
    {
      name: "Status",
      cell: (row) => (
        <Badge
          color={statusColors[row.status || "In Progress"]}
          className="rounded"
        >
          {row.status}
        </Badge>
        //   <Input
        //     type="select"
        //     value={row.status || "In Progress"}
        //     onChange={(e) => handleStatusChange(row.id, e.target.value)}
        //     className={`form-select-sm border-2 border-${
        //       statusColors[row.status || "In Progress"]
        //     } bg-light`}
        //   >
        //     <option value="In Progress">In Progress</option>
        //     <option value="Incomplete">Incomplete</option>
        //     <option value="Certified">Certified</option>
        //   </Input>
      ),
      sortable: true,
      width: "180px",
    },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div className="d-flex">
    //       <Button
    //         color="link"
    //         size="sm"
    //         onClick={() => handleViewDetails(row)}
    //         className="text-primary"
    //       >
    //         <FiEye size={18} />
    //       </Button>
    //       {/* <Button color="link" size="sm" className="text-warning">
    //         <FiEdit2 size={18} />
    //       </Button>
    //       <Button color="link" size="sm" className="text-danger">
    //         <FiTrash2 size={18} />
    //       </Button> */}
    //     </div>
    //   ),
    //   width: "150px",
    // },
  ];

  const customStyles = {
    head: {
      style: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#000000",
        color: "#ffffff",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "12px",
        paddingBottom: "12px",
        backgroundColor: "#ffffff",
      },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff",
        "&:not(:last-of-type)": {
          borderBottomColor: "#e9ecef",
        },
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      },
    },
  };
  console.log(
    filteredData.filter((item) => item.status),
    "filteredData"
  );
  return (
    <>
      <NavbarComponent />
      <div className="container-fluid px-3 py-4">
        <Card className="shadow-sm border-0 rounded-lg overflow-hidden">
          <CardHeader className="bg-primary text-white py-3">
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <h4 className="mb-0 d-flex align-items-center">
                  <FaGraduationCap className="me-2" />
                  Student Enrollment Dashboard
                </h4>
              </Col>
              <Col xs={12} md={6} className="mt-2 mt-md-0">
                <div className="d-flex justify-content-md-end">
                  <div
                    className="input-group me-2"
                    style={{ maxWidth: "300px" }}
                  >
                    <span className="input-group-text bg-white">
                      <FiSearch />
                    </span>
                    <Input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-start-0"
                    />
                  </div>
                  <Button
                    color="light"
                    onClick={fetchEnrollments}
                    className="d-flex align-items-center"
                  >
                    <FiRefreshCw className="me-1" />
                    {!isMobile && "Refresh"}
                  </Button>
                </div>
              </Col>
            </Row>
          </CardHeader>

          <CardBody className="p-0">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle
                    color="outline-secondary"
                    className="d-flex align-items-center"
                  >
                    <FiFilter className="me-1" />
                    {statusFilter}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setStatusFilter("All")}>
                      All Students
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setStatusFilter("In Progress")}
                    >
                      In Progress
                    </DropdownItem>
                    <DropdownItem onClick={() => setStatusFilter("Incomplete")}>
                      Incomplete
                    </DropdownItem>
                    <DropdownItem onClick={() => setStatusFilter("Certified")}>
                      Certified
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div>
                <span className="text-muted small">
                  Showing {filteredData.length} of {enrollments.length} students
                </span>
              </div>
            </div>

            <div className="table-responsive">
              <DataTable
                columns={isMobile ? mobileColumns : desktopColumns}
                data={filteredData.filter(
                  (item) => item.status === "Certified"
                )}
                customStyles={customStyles}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 25, 50]}
                highlightOnHover
                pointerOnHover
                responsive
                striped
                dense
                progressPending={loading}
                progressComponent={
                  <div className="py-5 text-center">
                    <Spinner color="primary" />
                    <div className="mt-2">Loading student data...</div>
                  </div>
                }
                noDataComponent={
                  <div className="py-5 text-center text-muted">
                    {searchTerm
                      ? "No matching students found"
                      : "No student data available"}
                  </div>
                }
                className="border-top-0"
              />
            </div>
          </CardBody>
        </Card>

        {/* Student Detail Modal */}
        <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
          <ModalHeader toggle={toggleModal}>
            Student Details: {selectedStudent?.name}
          </ModalHeader>
          <ModalBody>
            {selectedStudent && (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h6 className="text-muted">Personal Information</h6>
                  <div className="ps-3">
                    <p>
                      <strong>Name:</strong> {selectedStudent.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedStudent.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedStudent.phone}
                    </p>
                    <p>
                      <strong>Location:</strong> {selectedStudent.location}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <h6 className="text-muted">Course Details</h6>
                  <div className="ps-3">
                    <p>
                      <strong>Course ID:</strong> {selectedStudent.courseId}
                    </p>
                    <p>
                      <strong>Package No:</strong> {selectedStudent.packageNo}
                    </p>
                    <p>
                      <strong>Instructor:</strong> {selectedStudent.instructor}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <Badge
                        color={
                          statusColors[selectedStudent.status || "In Progress"]
                        }
                        className="rounded"
                      >
                        {selectedStudent.status || "In Progress"}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <h6 className="text-muted">Payment Information</h6>
                  <div className="ps-3">
                    <p>
                      <strong>Payment:</strong> ${selectedStudent.payment || 0}
                    </p>
                    <p>
                      <strong>Remaining:</strong> $
                      {selectedStudent.remainingPayment || 0}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <h6 className="text-muted">Additional Information</h6>
                  <div className="ps-3">
                    <p>
                      <strong>Road Test:</strong>{" "}
                      {selectedStudent.roadTest || "N/A"}
                    </p>
                    <p>
                      <strong>License:</strong>{" "}
                      {selectedStudent.license || "N/A"}
                    </p>
                    <p>
                      <strong>Notes:</strong> {selectedStudent.notes || "None"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button color="primary">Edit Student</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Certifiedstudents;
