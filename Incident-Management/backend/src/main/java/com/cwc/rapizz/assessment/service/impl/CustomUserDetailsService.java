package com.cwc.rapizz.assessment.service.impl;

import java.util.Collections;
import java.util.Optional;

import com.cwc.rapizz.assessment.models.CustomUser;
import com.cwc.rapizz.assessment.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        if (userRepository == null) {
            throw new IllegalArgumentException("UserRepository must not be null");
        }
        this.userRepository = userRepository;
        logger.info("CustomUserDetailsService initialized successfully.");
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email == null || email.trim().isEmpty()) {
            logger.error("Provided email is null or empty.");
            throw new IllegalArgumentException("Email must not be null or empty");
        }

        logger.info("Attempting to load user by email: {}", email);

        Optional<CustomUser> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            logger.warn("User not found with email: {}", email);
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        CustomUser user = userOptional.get();

        if (user.getEmail() == null || user.getPassword() == null) {
            logger.error("User email or password is null for email: {}", email);
            throw new IllegalStateException("User email or password is missing in the database for email: " + email);
        }

        logger.info("User successfully loaded for email: {}", email);

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}
