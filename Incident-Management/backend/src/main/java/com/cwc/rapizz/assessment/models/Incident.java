package com.cwc.rapizz.assessment.models;

import com.cwc.rapizz.assessment.models.enums.Priority;
import com.cwc.rapizz.assessment.models.enums.Status;
import com.cwc.rapizz.assessment.models.enums.Type;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident_info")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String incidentId;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String details;
    private String reporterName; 
    private LocalDate reportedAt;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Status status;
    private Long userId;

    @PrePersist
    public void prePersist() {
        this.reportedAt = LocalDate.now();
        this.incidentId = "RMG" + (int) (Math.random() * 100000) + LocalDateTime.now().getYear();
    }
}
