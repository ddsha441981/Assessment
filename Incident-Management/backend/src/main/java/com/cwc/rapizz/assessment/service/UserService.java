package com.cwc.rapizz.assessment.service;

import com.cwc.rapizz.assessment.dto.request.UserRequest;
import com.cwc.rapizz.assessment.dto.response.UserResponse;
import com.cwc.rapizz.assessment.models.CustomUser;

import java.util.List;

public interface UserService {

    CustomUser registerUser(UserRequest userRequest);
    List<UserResponse> getUserList();
    UserResponse getUserById(long userId);

}
