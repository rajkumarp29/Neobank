package com.infy.neobank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.LoanApplicationRequestDTO;
import com.infy.neobank.repository.UserRepository;
import com.infy.neobank.service.LoanApplicationService;

@RestController
@RequestMapping("/api/loans")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    @Autowired
    private UserRepository userRepository;

    // APPLY LOAN
    @PostMapping("/apply")
    public ResponseEntity<?> applyLoan(
            @RequestBody LoanApplicationRequestDTO requestDTO,
            Authentication authentication) {

        try {

            String email =
                    authentication.getName();

            Long userId =
                    userRepository
                            .findByEmailIgnoreCase(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "User not found"))
                            .getId();

            String response =
                    loanApplicationService
                            .applyLoan(
                                    requestDTO,
                                    userId);

            return ResponseEntity.ok(
                    response);

        } catch (RuntimeException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }

    // MY LOANS
    @GetMapping("/my-loans")
    public ResponseEntity<?> getMyLoans(
            Authentication authentication) {

        try {

            String email =
                    authentication.getName();

            Long userId =
                    userRepository
                            .findByEmailIgnoreCase(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "User not found"))
                            .getId();

            return ResponseEntity.ok(
                    loanApplicationService
                            .getMyLoans(
                                    userId));

        } catch (RuntimeException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
}