package com.cwc.rapizz.assessment.exceptions;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class ErrorResponse {
    private UUID errorID;
    private int statusCode;
    private LocalDateTime timestamp;
    private String message;
    private String description;
    private String path;
}
