package com.infy.neobank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.LoanAccountDTO;
import com.infy.neobank.repository.UserRepository;
import com.infy.neobank.service.LoanAccountService;

@RestController
@RequestMapping("/api/loans")
public class LoanAccountController {

    @Autowired
    private LoanAccountService service;

    @Autowired
    private UserRepository userRepository;

    // GET MY LOAN ACCOUNTS
    @GetMapping("/accounts")
    public List<LoanAccountDTO> getMyLoans(
            Authentication authentication) {

        String email =
                authentication.getName();

        Long userId =
                userRepository
                        .findByEmailIgnoreCase(
                                email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"))
                        .getId();

        return service.getMyAccounts(
                userId);
    }
}