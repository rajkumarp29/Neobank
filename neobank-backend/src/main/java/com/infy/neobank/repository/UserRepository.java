package com.infy.neobank.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.infy.neobank.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(String email);

    boolean existsByEmail(String email);

    // ✅ FIXED METHOD
    long countByIsActiveTrue();
}
