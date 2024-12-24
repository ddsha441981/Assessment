package com.cwc.rapizz.assessment.service.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.cwc.rapizz.assessment.dto.request.IncidentRequest;
import com.cwc.rapizz.assessment.models.Incident;
import com.cwc.rapizz.assessment.models.enums.Status;
import com.cwc.rapizz.assessment.repository.IncidentRepository;
import com.cwc.rapizz.assessment.service.IncidentService;

@Service
public class IncidentServiceImpl implements IncidentService {

    private static final Logger logger = LoggerFactory.getLogger(IncidentServiceImpl.class);

    private final IncidentRepository incidentRepository;

    public IncidentServiceImpl(IncidentRepository incidentRepository) {
        if (incidentRepository == null) {
            throw new IllegalArgumentException("IncidentRepository must not be null");
        }
        this.incidentRepository = incidentRepository;
        logger.info("IncidentServiceImpl initialized successfully.");
    }

   

    private Incident mapToIncident(IncidentRequest incidentRequest) {
        return Incident.builder()
                .incidentId(incidentRequest.getIncidentId())
                .details(incidentRequest.getDetails())
                .reporterName(incidentRequest.getReporterName())
                .reportedAt(incidentRequest.getReportedAt())
                .status(incidentRequest.getStatus() != null ? incidentRequest.getStatus() : Status.OPEN)
                .priority(incidentRequest.getPriority())
                .type(incidentRequest.getType())
                .userId(incidentRequest.getUserId())
                .build();
    }

    @Override
    public List<Incident> getUserIncidents(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("UserId must not be null");
        }

        logger.info("Fetching incidents for userId: {}", userId);
        return incidentRepository.findByUserId(userId);
    }

    @Override
    public Optional<Incident> findIncidentById(String incidentId) {
        if (incidentId == null || incidentId.trim().isEmpty()) {
            throw new IllegalArgumentException("IncidentId must not be null or empty");
        }

        logger.info("Fetching incident with id: {}", incidentId);
        return incidentRepository.findByIncidentId(incidentId);
    }

    @Override
    public Incident updateIncident(String incidentId, IncidentRequest incidentRequest, Long userId) {
        if (incidentId == null || incidentId.trim().isEmpty() || incidentRequest == null || userId == null) {
            throw new IllegalArgumentException("IncidentId, IncidentRequest, and UserId must not be null or empty");
        }

        logger.info("Updating incident with id: {} for userId: {}", incidentId, userId);

        Incident existingIncident = incidentRepository.findByIncidentId(incidentId)
                .orElseThrow(() -> {
                    logger.error("Incident with id: {} not found", incidentId);
                    return new RuntimeException("Incident not found");
                });

        if (!existingIncident.getUserId().equals(userId)) {
            logger.error("User with id: {} does not have permission to edit incident id: {}", userId, incidentId);
            throw new RuntimeException("You do not have permission to edit this incident");
        }

        if (existingIncident.getStatus() == Status.CLOSED) {
            logger.error("Attempt to edit closed incident with id: {}", incidentId);
            throw new RuntimeException("Cannot edit a closed incident");
        }

        existingIncident.setDetails(incidentRequest.getDetails());
        existingIncident.setPriority(incidentRequest.getPriority());
        existingIncident.setStatus(incidentRequest.getStatus());

        Incident updatedIncident = incidentRepository.save(existingIncident);
        logger.info("Incident with id: {} successfully updated", incidentId);
        return updatedIncident;
    }

	@Override
	public Incident createIncident(IncidentRequest incidentRequest) {
		Incident mapToIncident = mapToIncident(incidentRequest);
		this.incidentRepository.save(mapToIncident);
		return this.incidentRepository.save(mapToIncident);
	}
}
