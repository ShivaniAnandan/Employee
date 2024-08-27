import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'; // Bootstrap imports

const EditEmployee = () => {
  const { email } = useParams(); // Get the employee's email from the URL
  const navigate = useNavigate(); // For navigating after update
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
  });

  useEffect(() => {
    fetchEmployeeData();
  }, [email]); // Ensure this runs when email changes

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/get-empdetails/${email}`);
      if (response.data && response.data.data) {
        const employee = response.data.data;
        setEmployeeData({
          firstName: employee.firstName || '',
          lastName: employee.lastName || '',
          email: employee.email || '',
          designation: employee.designation || '',
        });
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/edit-emp/${email}`, employeeData);
      alert('Employee details updated successfully');
      navigate('/'); // Navigate back to the card page after successful update
    } catch (error) {
      console.error('Error updating employee details:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Edit Employee</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={employeeData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={employeeData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={employeeData.email}
                    readOnly // Make email non-editable
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={employeeData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter designation"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" className="mx-2">
                    Update Employee
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEmployee;
