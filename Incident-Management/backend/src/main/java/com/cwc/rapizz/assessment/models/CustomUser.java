package com.cwc.rapizz.assessment.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_info")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    @Column(unique = true)
    private String email;
    private String phone;
    private String address;
    private String pinCode;
    private String city;
    private String country;
    private String password;//Hashed Password
}