package com.cwc.rapizz.assessment.repository;

import com.cwc.rapizz.assessment.models.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<CustomUser,Long> {
    Optional<CustomUser> findByEmail(String email);
}
