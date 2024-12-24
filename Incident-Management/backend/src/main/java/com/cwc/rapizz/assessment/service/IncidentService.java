package com.cwc.rapizz.assessment.service;

import com.cwc.rapizz.assessment.dto.request.IncidentRequest;
import com.cwc.rapizz.assessment.models.Incident;

import java.util.List;
import java.util.Optional;

public interface IncidentService {
    Incident createIncident(IncidentRequest incidentRequest);
    List<Incident> getUserIncidents(Long userId);
    Optional<Incident> findIncidentById(String incidentId);
    Incident updateIncident(String incidentId, IncidentRequest incidentRequest, Long userId);
}
