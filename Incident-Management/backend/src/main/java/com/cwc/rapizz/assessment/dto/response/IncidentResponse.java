package com.cwc.rapizz.assessment.dto.response;

import com.cwc.rapizz.assessment.models.enums.Priority;
import com.cwc.rapizz.assessment.models.enums.Status;
import com.cwc.rapizz.assessment.models.enums.Type;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncidentResponse {
    private Long id;
    private String incidentId;
    private Type type;
    private String details;
    private LocalDate reportedAt;
    private Priority priority;
    private String reporterName; 
    private Status status;
    private Long userId;
}
