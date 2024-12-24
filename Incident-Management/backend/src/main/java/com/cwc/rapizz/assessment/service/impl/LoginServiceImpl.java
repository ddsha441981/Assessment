package com.cwc.rapizz.assessment.service.impl;

import com.cwc.rapizz.assessment.dto.request.LoginRequest;
import com.cwc.rapizz.assessment.dto.response.LoginResponse;
import com.cwc.rapizz.assessment.exceptions.concrete.UserNotFoundException;
import com.cwc.rapizz.assessment.models.CustomUser;
import com.cwc.rapizz.assessment.repository.UserRepository;
import com.cwc.rapizz.assessment.service.LoginService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

	private static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;

	public LoginServiceImpl(AuthenticationManager authenticationManager,UserRepository userRepository) {
		if (authenticationManager == null) {
			throw new IllegalArgumentException("AuthenticationManager must not be null");
		}
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		logger.info("LoginServiceImpl initialized successfully.");
	}
	
	@Override
    public LoginResponse login(LoginRequest loginRequest) {
        validateLoginRequest(loginRequest);

        try {
            logger.info("Attempting login for email: {}", loginRequest.getEmail());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            CustomUser user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            Long userId = user.getUserId();

            LoginResponse response = new LoginResponse();
            response.setUserId(userId);
            response.setMessage("Login successful");
            logger.info("Login successful for email: {}", loginRequest.getEmail());
            return response;

        } catch (BadCredentialsException e) {
            logger.warn("Invalid credentials for email: {}", loginRequest.getEmail());
            return createErrorResponse("Invalid credentials");

        } catch (AuthenticationException e) {
            logger.error("Authentication failed for email: {}", loginRequest.getEmail(), e);
            return createErrorResponse("Authentication failed. Please try again later.");
        } catch (IllegalArgumentException e) {
            logger.error("Error retrieving user: {}", e.getMessage());
            return createErrorResponse("User not found");
        }
    }

	private void validateLoginRequest(LoginRequest loginRequest) {
		if (loginRequest == null) {
			logger.error("LoginRequest is null");
			throw new IllegalArgumentException("LoginRequest must not be null");
		}

		if (loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) {
			logger.error("Email is null or empty in LoginRequest");
			throw new IllegalArgumentException("Email must not be null or empty");
		}

		if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
			logger.error("Password is null or empty in LoginRequest");
			throw new IllegalArgumentException("Password must not be null or empty");
		}
	}

	private LoginResponse createErrorResponse(String message) {
		LoginResponse response = new LoginResponse();
		response.setMessage(message);
		return response;
	}
}
