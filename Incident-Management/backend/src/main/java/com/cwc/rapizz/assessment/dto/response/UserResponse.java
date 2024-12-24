package com.cwc.rapizz.assessment.dto.response;


import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long userId;
    private String userName;
    private String email;
    private String phone;
    private String address;
    private String pinCode;
    private String city;
    private String country;
    private String password;
}
