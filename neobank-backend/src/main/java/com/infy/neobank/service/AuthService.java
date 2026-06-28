package com.infy.neobank.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.infy.neobank.entity.Role;
import com.infy.neobank.entity.User;
import com.infy.neobank.repository.UserRepository;
import com.infy.neobank.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ✅ REGISTER
    public User register(User request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        request.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        request.setRole(Role.CUSTOMER);
        request.setIsActive(true);

        return userRepository.save(request);
    }

    // ✅ LOGIN
    public String login(String email, String password) {

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new RuntimeException("User account is inactive");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // ✅ JWT subject = EMAIL (IMPORTANT)
        return jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );
    }
}