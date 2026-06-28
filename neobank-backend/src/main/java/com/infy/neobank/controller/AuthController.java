package com.infy.neobank.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.AuthResponse;
import com.infy.neobank.dto.LoginRequest;
import com.infy.neobank.dto.RegisterRequest;
import com.infy.neobank.entity.User;
import com.infy.neobank.service.AuthService;
import com.infy.neobank.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService,
                          AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    // 🔹 Register API
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        return ResponseEntity
                .status(201)
                .body(userService.register(request));
    }

    // 🔹 Login API ✅✅✅ FIXED
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        String token = authService.login(
                request.getEmail(),
                request.getPassword());

     
    User user = userService.getByEmail(request.getEmail());

        // ✅ SEND REAL ROLE & FULL NAME
        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        user.getEmail(),
                        user.getRole().name(),   // ADMIN or CUSTOMER
                        user.getFullName()       // Rocky
                )
        );
    }
}