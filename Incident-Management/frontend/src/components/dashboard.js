import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner, Alert, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from './services/userService';


const Dashboard = () => {
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (!storedUserId) {
      navigate('/login');
    } else {
      setUserId(storedUserId);
      fetchProfileData(storedUserId); 
    }
  }, [navigate]);

  const fetchProfileData = async (userId) => {
    setLoading(true);
    try {
      const profileData = await fetchProfile(userId);  
      setProfile(profileData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

//   const handleAddIncident = () => {
//     navigate(`/add_incident/${userId}`);
//   };

  const handleViewIncidents = () => {
    navigate(`/view_incident/${userId}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs="12" sm="8" md="6" lg="5">
          <h2 className="text-center mb-4">My Profile</h2>

          {loading && <Spinner color="primary" />}

          {error && <Alert color="danger">{error}</Alert>}

          {profile && (
            <Card className="shadow">
              <CardBody>
                <CardTitle tag="h5" className="text-primary">
                  {profile.name}
                </CardTitle>
                <CardText>
                  <strong>Email:</strong> {profile.email}
                </CardText>
                <CardText>
                  <strong>Phone:</strong> {profile.phone}
                </CardText>
                <CardText>
                  <strong>Address:</strong> {profile.address}
                </CardText>
                <div className="mt-4 d-flex justify-content-between">
                  {/* <Button color="success" onClick={handleAddIncident}>
                    Add Incident
                  </Button> */}
                  <Button color="info" onClick={handleViewIncidents}>
                    View Incidents
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
