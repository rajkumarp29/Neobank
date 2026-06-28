package com.infy.neobank.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infy.neobank.dto.UpdateProfileRequest;
import com.infy.neobank.dto.UserResponse;
import com.infy.neobank.entity.User;
import com.infy.neobank.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET PROFILE
    @GetMapping("/me")
    public UserResponse getProfile() {

        User user = userService.getCurrentUser();

        return new UserResponse(
                user.getId(),           // ✅ ADDED
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    // ✅ UPDATE PROFILE
    @PutMapping("/me")
    public UserResponse updateProfile(@RequestBody UpdateProfileRequest request) {

        User user = userService.updateProfile(request.getFullName());

        return new UserResponse(
                user.getId(),           // ✅ ADDED
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}