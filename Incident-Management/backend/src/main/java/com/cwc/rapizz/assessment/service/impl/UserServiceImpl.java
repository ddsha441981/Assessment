package com.cwc.rapizz.assessment.service.impl;

import com.cwc.rapizz.assessment.dto.request.UserRequest;
import com.cwc.rapizz.assessment.dto.response.UserResponse;
import com.cwc.rapizz.assessment.exceptions.concrete.UserNotFoundException;
import com.cwc.rapizz.assessment.models.CustomUser;
import com.cwc.rapizz.assessment.repository.UserRepository;
import com.cwc.rapizz.assessment.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    
    private final UserRepository userRepository;

    
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        logger.info("UserServiceImpl initialized successfully.");
    }

    @Override
    public CustomUser registerUser(UserRequest userRequest) {
        validateUserRequest(userRequest);

        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            logger.warn("Attempted registration with existing email: {}", userRequest.getEmail());
            throw new IllegalArgumentException("Email already exists!");
        }

        userRequest.setPassword(new BCryptPasswordEncoder().encode(userRequest.getPassword()));
        CustomUser user = mapToUserEntity(userRequest);

        CustomUser savedUser = userRepository.save(user);
        logger.info("User registered successfully with email: {}", savedUser.getEmail());
        return savedUser;
    }

    @Override
    public List<UserResponse> getUserList() {
        List<CustomUser> userList = userRepository.findAll();
        if (userList.isEmpty()) {
            logger.info("No users found in the database.");
        } else {
            logger.info("Retrieved {} users from the database.", userList.size());
        }
        return userList.stream().map(this::mapToUserResponse).toList();
    }

    @Override
    public UserResponse getUserById(long userId) {
        CustomUser user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    logger.error("User not found with ID: {}", userId);
                    return new UserNotFoundException("User not found with associated ID: " + userId);
                });

        logger.info("User retrieved successfully for ID: {}", userId);
        return mapToUserResponse(user);
    }

    private void validateUserRequest(UserRequest userRequest) {
        if (userRequest == null) {
            logger.error("UserRequest is null");
            throw new IllegalArgumentException("UserRequest must not be null");
        }

        if (userRequest.getEmail() == null || userRequest.getEmail().isBlank()) {
            logger.error("User email is missing in UserRequest");
            throw new IllegalArgumentException("Email must not be null or empty");
        }

        if (userRequest.getPassword() == null || userRequest.getPassword().isBlank()) {
            logger.error("User password is missing in UserRequest");
            throw new IllegalArgumentException("Password must not be null or empty");
        }
    }

    private CustomUser mapToUserEntity(UserRequest userRequest) {
        return CustomUser.builder()
                .userId(userRequest.getUserId())
                .userName(userRequest.getUserName())
                .email(userRequest.getEmail())
                .phone(userRequest.getPhone())
                .address(userRequest.getAddress())
                .city(userRequest.getCity())
                .pinCode(userRequest.getPinCode())
                .password(userRequest.getPassword())
                .country(userRequest.getCountry())
                .build();
    }

    private UserResponse mapToUserResponse(CustomUser user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .city(user.getCity())
                .pinCode(user.getPinCode())
                .password(null)
                .country(user.getCountry())
                .build();
    }
}
