package com.infy.neobank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.infy.neobank.dto.FinancialInsightsDTO;
import com.infy.neobank.service.InsightsService;
import com.infy.neobank.repository.UserRepository;

@RestController
@RequestMapping("/api/insights")
public class InsightsController {

    @Autowired
    private InsightsService service;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    @PreAuthorize("isAuthenticated()")
    public FinancialInsightsDTO getInsights(
            @PathVariable Long userId,
            @AuthenticationPrincipal UserDetails userDetails) {

        // getName() returns EMAIL (not numeric ID) — look up user by email
        String loggedEmail = userDetails.getUsername();

        var loggedUser = userRepository.findByEmailIgnoreCase(loggedEmail)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        if (!loggedUser.getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        return service.buildInsights(userId);
    }
}