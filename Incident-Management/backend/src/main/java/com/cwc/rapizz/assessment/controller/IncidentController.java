package com.cwc.rapizz.assessment.controller;

import com.cwc.rapizz.assessment.dto.request.IncidentRequest;
import com.cwc.rapizz.assessment.models.Incident;
import com.cwc.rapizz.assessment.service.IncidentService;

import lombok.SneakyThrows;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {

    private final IncidentService incidentService;

  
    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createIncident(@RequestBody IncidentRequest incidentRequest) {
    	Incident incident = incidentService.createIncident(incidentRequest);
    	return new ResponseEntity<>(incident,HttpStatus.OK);
    }

    @SneakyThrows
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Incident>> getUserIncidents(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(incidentService.getUserIncidents(userId));
    }

    @SneakyThrows
    @GetMapping("/search")
    public ResponseEntity<Incident> searchIncident(@RequestParam("incidentId") String incidentId) {
        return incidentService.findIncidentById(incidentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @SneakyThrows
    @PutMapping("/{incidentId}")
    public ResponseEntity<Incident> updateIncident(
            @PathVariable String incidentId,
            @RequestBody IncidentRequest incidentRequest,
            @RequestHeader("userId") Long userId) {
        return ResponseEntity.ok(incidentService.updateIncident(incidentId, incidentRequest, userId));
    }
}

