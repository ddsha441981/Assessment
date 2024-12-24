import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchIncidentsByUserId } from '../services/incidentService';

const ViewIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIncidentsByUserId(userId);
        console.log(data);
        setIncidents(data);
        setFilteredIncidents(data); 
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const toggleDropdown = (rowId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const handleAddIncident = () => {
    navigate(`/add_incident/${userId}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = incidents.filter((incident) =>
        incident.incidentId.toLowerCase().includes(query)
      );
      setFilteredIncidents(filtered);
    } else {
      setFilteredIncidents(incidents);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Incident List</h3>
        <Button color="success" onClick={handleAddIncident}>
          Add Incident
        </Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Input
          type="text"
          placeholder="Search by Incident ID"
          value={searchQuery}
          onChange={handleSearch}
          className="w-25"
        />
      </div>

      <div className="table-responsive">
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Incident ID</th>
              <th>Type</th>
              <th>Details</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Reporter</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((incident, index) => (
              <tr key={incident.IncidentId}>
                <th scope="row">{index + 1}</th>
                <td>{incident.incidentId}</td>
                <td>{incident.type}</td>
                <td>{incident.details}</td>
                <td>{incident.priority}</td>
                <td>{incident.status}</td>
                <td>{incident.reporterName}</td>
                <td>
                  <Dropdown
                    isOpen={dropdownOpen[incident.IncidentId] || false}
                    toggle={() => toggleDropdown(incident.IncidentId)}
                  >
                    <DropdownToggle
                      tag="button"
                      className="btn btn-link p-0 border-0 text-decoration-none"
                    >
                      <span>⋮</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {filteredIncidents.length === 0 && <p>No incidents found</p>}
      </div>
    </Container>
  );
};

export default ViewIncidents;
