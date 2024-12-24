package com.cwc.rapizz.assessment.dto.request;

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
public class IncidentRequest {
    private Long id;
    private String incidentId;
    private Type type;
    private String details;
    private String reporterName; 
    private LocalDate reportedAt;
    private Priority priority;
    private Status status;
    private Long userId;
}
