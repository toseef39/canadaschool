import React, { useRef } from "react";
import "./enrollment.css";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import NavbarComponent from "../common/Navbar";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export const Enrollmentform = () => {
  const fileInputRef = useRef(null);

  const initialValues = {
    name: "",
    payment: "",
    email: "",
    remainingPayment: "",
    phone: "",
    cabinetFile: "",
    courseId: "",
    driverLicense: null,
    packageNo: "",
    notes: "",
    location: "",
    roadTest: "",
    license: "",
    instructor: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    payment: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string().required("Required"),
    courseId: Yup.string().required("Required"),
    packageNo: Yup.string().required("Required"),
    roadTest: Yup.string().required("Required"),
    license: Yup.string().required("Required"),
    instructor: Yup.string().required("Required"),
  });

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (values) => {
    try {
      let base64DriverLicense = null;
  
      if (values.driverLicense) {
        base64DriverLicense = await convertToBase64(values.driverLicense);
      }
  
      const payload = {
        ...values,
        driverLicense: base64DriverLicense,
        status: "In Progress",
        createdAt: Timestamp.now(),
      };
  
      const docRef = await addDoc(collection(db, "enrollments"), payload);
      console.log("Document written with ID: ", docRef.id);
      alert("Enrollment saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving enrollment.");
    }
  };
  

  return (
    <>
      <NavbarComponent />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 text-white py-5 px-2"
        style={{ background: "linear-gradient(145deg, #fffbe6, #ffe0b2)" }}
      >
        <div
          className="w-100 rounded-5 shadow-lg p-5 border border-0"
          style={{
            maxWidth: "1000px",
            background: "linear-gradient(to right, #FFF3E0, #FFE0B2)",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <FormikForm>
                <div className="text-center mb-5">
                  <h3 className="fw-semibold text-dark">Enrollment Form</h3>
                  <hr className="border-warning opacity-75 w-50 mx-auto" />
                </div>

                <Row className="g-2">
                  {[
                    {
                      name: "name",
                      label: "Name *",
                      type: "text",
                      placeholder: "John Doe",
                    },
                    {
                      name: "payment",
                      label: "Payment *",
                      type: "text",
                      placeholder: "$200",
                    },
                    {
                      name: "email",
                      label: "Email *",
                      type: "email",
                      placeholder: "john@example.com",
                    },
                    {
                      name: "remainingPayment",
                      label: "Remaining Payment",
                      type: "text",
                      placeholder: "$100",
                    },
                    {
                      name: "phone",
                      label: "Phone No. *",
                      type: "tel",
                      placeholder: "(123) 456-7890",
                    },
                    {
                      name: "cabinetFile",
                      label: "Cabinet File",
                      type: "text",
                    },
                    { name: "courseId", label: "Course ID *", type: "text" },
                    {
                      name: "driverLicense",
                      label: "Upload Driver’s License",
                      type: "file",
                    },
                    {
                      name: "packageNo",
                      label: "Package No. * (1, 2, 3)",
                      type: "text",
                    },
                    {
                      name: "location",
                      label: "Location",
                      type: "text",
                      placeholder: "Barrie, Ontario",
                    },
                    {
                      name: "roadTest",
                      label: "Road Test *",
                      type: "text",
                      placeholder: "Not Applicable, Done",
                    },
                    {
                      name: "license",
                      label: "License # *",
                      type: "text",
                      placeholder: "X0000-000000-00000",
                    },
                    {
                      name: "instructor",
                      label: "Assigned Instructor *",
                      type: "text",
                    },
                    {
                      name: "notes",
                      label: "Notes",
                      type: "text",
                      placeholder: "Any additional info...",
                    },
                  ].map((field, idx) => (
                    <Col md={6} key={idx}>
                      <FormGroup>
                        <Label className="fw-medium text-dark">
                          {field.label}
                        </Label>
                        {field.type === "file" ? (
                          <Input
                            name={field.name}
                            type="file"
                            onChange={(event) =>
                              setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              )
                            }
                            className="form-control-custom"
                            style={{
                              backgroundColor: "#D7CCC8",
                              border: "2px solid #FFB74D",
                              borderRadius: "12px",
                              color: "#3E2723",
                              transition: "all 0.3s ease",
                            }}
                          />
                        ) : (
                          <Field
                            as={field.type === "textarea" ? "textarea" : Input}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder || ""}
                            className="form-control-custom"
                            style={{
                              backgroundColor: "#D7CCC8",
                              border: "2px solid #FFB74D",
                              borderRadius: "12px",
                              color: "#3E2723",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#EFEBE9")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "#D7CCC8")
                            }
                          />
                        )}
                        <ErrorMessage
                          name={field.name}
                          component="div"
                          className="text-danger small"
                        />
                      </FormGroup>
                    </Col>
                  ))}
                </Row>

                <div className="text-center mt-5">
                  <Button
                    type="submit"
                    size="lg"
                    className="me-3 px-5 fw-semibold rounded-pill border-0"
                    style={{ background: "#FF6F00", color: "white" }}
                  >
                    SAVE
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className="px-4 py-2 mt-3 mt-md-0 fw-semibold rounded-pill border-0  w-md-auto"
                    style={{
                      background: "#FFA000",
                      color: "white",
                      fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                    }}
                  >
                    Save with Current Date & Time
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p
                    className="fw-semibold text-danger px-2"
                    style={{
                      fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                      margin: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    ✅ Saved in Access Students Database. File is editable.
                  </p>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};
