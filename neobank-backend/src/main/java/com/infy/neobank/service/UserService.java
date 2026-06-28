package com.infy.neobank.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.RegisterRequest;
import com.infy.neobank.entity.Role;
import com.infy.neobank.entity.User;
import com.infy.neobank.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Constructor Injection
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ====================================================
    // ✅ REGISTER USER
    // ====================================================
    public User register(RegisterRequest request) {

        // 🔹 1. Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists ❌");
        }

        // 🔹 2. Validate input
        if (request.getFullName() == null || request.getFullName().isEmpty()) {
            throw new RuntimeException("Full name is required ❌");
        }

        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters ❌");
        }

        // 🔹 3. Create User
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail().trim().toLowerCase());

        // ✅ Encrypt password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // ✅ Default role
        user.setRole(Role.CUSTOMER);
        user.setIsActive(true);

        // 🔹 4. Save
        return userRepository.save(user);
    }

    // ====================================================
    // ✅ GET CURRENT LOGGED‑IN USER
    // ====================================================
    public User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));
    }

    // ====================================================
    // ✅ UPDATE PROFILE
    // ====================================================
    public User updateProfile(String fullName) {

        User user = getCurrentUser();
        user.setFullName(fullName);

        return userRepository.save(user);
    }

    // ====================================================
    // ✅ ADMIN: GET ALL USERS
    // ====================================================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ====================================================
    // ✅ ADMIN: UPDATE USER ROLE  🔥 NEW
    // ====================================================
    public void updateUserRole(Long userId, String role) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with ID: " + userId));

        // ✅ Convert & validate role
        Role newRole;
        try {
            newRole = Role.valueOf(role);
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid role ❌");
        }

        user.setRole(newRole);
        userRepository.save(user);
    }

    // ====================================================
    // ✅ GET USER BY EMAIL (UTILITY)
    // ====================================================
    public User getByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + email));
    }
}