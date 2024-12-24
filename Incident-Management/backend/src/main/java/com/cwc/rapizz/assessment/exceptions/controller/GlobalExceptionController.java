package com.cwc.rapizz.assessment.exceptions.controller;

import com.cwc.rapizz.assessment.exceptions.ErrorResponse;
import com.cwc.rapizz.assessment.exceptions.concrete.EmailAlreadyExistsException;
import com.cwc.rapizz.assessment.exceptions.concrete.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.UUID;

@ControllerAdvice
@Slf4j
public class GlobalExceptionController {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> userNotFoundException(UserNotFoundException ex, HttpServletRequest request) {
        log.info("User not found with associated id  ! {} ");
        return  ResponseEntity.status(HttpStatus.NOT_FOUND.value())
                .body(ErrorResponse.builder()
                        .errorID(UUID.randomUUID())
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .timestamp(LocalDateTime.now(Clock.systemUTC()))
                        .message("User not found with associated id")
                        .description(ex.getMessage())
                        .path(request.getRequestURI())
                        .build());
    }
    
    
    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> emailAlreadyExistsException(EmailAlreadyExistsException ex, HttpServletRequest request) {
        log.info(" Email already exists! {} ");
        return  ResponseEntity.status(HttpStatus.NOT_FOUND.value())
                .body(ErrorResponse.builder()
                        .errorID(UUID.randomUUID())
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .timestamp(LocalDateTime.now(Clock.systemUTC()))
                        .message("Email already exists!")
                        .description(ex.getMessage())
                        .path(request.getRequestURI())
                        .build());
    }

}
