package com.cwc.rapizz.assessment.service;

import com.cwc.rapizz.assessment.dto.request.LoginRequest;
import com.cwc.rapizz.assessment.dto.response.LoginResponse;

public interface LoginService {
	
	LoginResponse login(LoginRequest loginRequest);
	

}
