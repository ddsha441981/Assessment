package com.cwc.rapizz.assessment.controller;

import com.cwc.rapizz.assessment.dto.request.LoginRequest;
import com.cwc.rapizz.assessment.dto.request.UserRequest;
import com.cwc.rapizz.assessment.dto.response.LoginResponse;
import com.cwc.rapizz.assessment.models.CustomUser;
import com.cwc.rapizz.assessment.service.LoginService;
import com.cwc.rapizz.assessment.service.UserService;

import lombok.SneakyThrows;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;
   

    public LoginController(UserService userService,LoginService loginService) {
		this.userService = userService;
		this.loginService = loginService;
    }
    
    
    @SneakyThrows
    @PostMapping("/signup")
    public ResponseEntity<CustomUser> registerUser(@RequestBody UserRequest userRequest) {
        CustomUser registeredUser = userService.registerUser(userRequest);
        return new  ResponseEntity<>(registeredUser, HttpStatus.OK);
    }
    

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {    	
    	LoginResponse loginResponse = this.loginService.login(loginRequest);
    	
    	return new ResponseEntity<>(loginResponse,HttpStatus.OK);
    }
}

