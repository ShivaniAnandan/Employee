import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'; // Bootstrap imports

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/get-empdetails');
      // Add profile image URL for each employee
      const employees = response.data.data.map(employee => ({
        ...employee,
        profileImage: `https://picsum.photos/id/${generateNumericId(employee._id)}/150`
      }));
      setData(employees);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching employee data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/employee/${id}`);
      if (response.status === 200) {
        setMessage(response.data.message);
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage('Error deleting employee');
    }
  };

  const generateNumericId = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    return Math.abs(hash) % 1000; // Limit the range of IDs
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Employee List</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Row>
        {data.map((item) => (
          <Col md={4} lg={3} key={item._id} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={item.profileImage} alt={item.firstName} />
              <Card.Body>
                <Card.Title>{item.firstName} {item.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.email}</Card.Subtitle>
                <Card.Text>
                  {item.designation}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/edit/${item.email}`)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="success" onClick={() => navigate('/create')}>Add Employee</Button>
      </div>
    </Container>
  );
};

export default CardComponent;
