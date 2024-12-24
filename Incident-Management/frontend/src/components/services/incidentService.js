import axios from "axios";
import { ADD_INCIDENT_URL, LIST_INCIDENT_URL } from "../utils/constants";

export const saveIncident = async (incident) => {
    console.log(incident);
    const credentials = localStorage.getItem('auth');
    if (!credentials) {
      throw new Error('Authentication credentials not found');
    }
    console.log(credentials);
    try {
      const response = await fetch(`${ADD_INCIDENT_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(incident),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save incident');
      }
  
      return await response.json(); 
    } catch (error) {
      console.error('Error saving incident:', error);
      throw error;
    }
  };

  export const fetchIncidentsByUserId = async (userId) => {
    try {
      const response = await axios.get(`${LIST_INCIDENT_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  };
  