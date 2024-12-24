import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import { saveIncident } from '../services/incidentService';
import { fetchProfile } from '../services/userService';
import { useParams,useNavigate } from 'react-router-dom';


const AddIncident = () => {

  const [incident, setIncident] = useState({
    type: '',
    details: '',
    reportedAt: '',
    priority: '',
    status: '',
    reporterName:'',
    userId:'',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await fetchProfile(userId);
        if (user) {
          setIncident((prevIncident) => ({
            ...prevIncident,
            reporterName: user.userName,
            userId: user.userId,
          }));
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile.');
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident((prevIncident) => ({
      ...prevIncident,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!incident.type || !incident.details || !incident.reporterName) {
      setError('Please fill in all required fields.');
      return;
    }
  
    setError('');
    setIsLoading(true);
  
    try {
      const response = await saveIncident(incident);
      const responseMessage = response.message || 'Incident saved successfully.';
      setMessage(responseMessage);
      navigate(`/view_incident/${userId}`);
      setIncident({
        type: '',
        details: '',
        reportedAt: '',
        priority: '',
        status: '',
        reporterName: '',
        userId: '',
      });
    } catch (err) {
      setError(err.message || 'An error occurred while saving the incident.');
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Incident Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={4} xs={12}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="select"
                name="type"
                id="type"
                value={incident.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="ENTERPRISE">Enterprise</option>
                <option value="GOVERNMENT">Government</option>
              </Input>
            </FormGroup>
          </Col>


          <Col md={4} xs={12}>
            <FormGroup>
              <Label for="reportedAt">Reported At</Label>
              <Input
                type="date"
                name="reportedAt"
                id="reportedAt"
                value={incident.reportedAt}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          <Col md={4} xs={12}>
            <FormGroup>
              <Label for="reporterName">Reporter Name</Label>
              <Input
                type="text"
                name="reporterName"
                id="reporterName"
                value={incident.reporterName}
                disabled 
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <FormGroup>
              <Label for="details">Details</Label>
              <Input
                type="textarea"
                name="details"
                id="details"
                value={incident.details}
                onChange={handleChange}
                placeholder="Enter Incident Details"
                required
              />
            </FormGroup>
          </Col>

          <Col md={6} xs={12}>
            <FormGroup>
              <Label for="priority">Priority</Label>
              <Input
                type="select"
                name="priority"
                id="priority"
                value={incident.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </Input>
            </FormGroup>
          </Col>

          <Col md={6} xs={12}>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={incident.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">CLOSED</option>
              </Input>
            </FormGroup>
          </Col>


          <Col xs={12}>
            {error && <Alert color="danger">{error}</Alert>}
            {message && <Alert color="success">{message}</Alert>}
          </Col>

          <Col xs={12}>
            <Button color="primary" type="submit" block>
              Save Incident
            </Button>
          </Col>
        </Row>
        <Input type="hidden" name="userId" value={incident.userId} />
      </Form>
    </Container>
  );
};

export default AddIncident;
