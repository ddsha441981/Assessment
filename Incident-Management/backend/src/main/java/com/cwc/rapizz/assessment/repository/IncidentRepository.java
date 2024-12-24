package com.cwc.rapizz.assessment.repository;

import com.cwc.rapizz.assessment.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByUserId(Long userId);
    Optional<Incident> findByIncidentId(String incidentId);
    
    
}

