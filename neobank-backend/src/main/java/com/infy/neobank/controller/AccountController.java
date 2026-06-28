package com.infy.neobank.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.entity.Account;
import com.infy.neobank.entity.AccountType;
import com.infy.neobank.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    // ✅ CREATE ACCOUNT
    @PostMapping
    public ResponseEntity<Account> createAccount(
            @RequestParam AccountType accountType) {

        Account account = accountService.createAccount(accountType);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(account);
    }

    // ✅ GET MY ACCOUNTS
    @GetMapping
    public List<Account> getMyAccounts() {
        return accountService.getMyAccounts();
    }

    // ✅ GET ACCOUNT BY ID
    @GetMapping("/{id}")
    public Account getAccount(@PathVariable Long id) {
        return accountService.getAccountById(id);
    }

    // ✅ CREDIT ACCOUNT  ✅✅✅ (MISSING BEFORE)
    @PostMapping("/{id}/credit")
    public Account credit(
            @PathVariable Long id,
            @RequestParam BigDecimal amount) {

        return accountService.credit(id, amount);
    }

    // ✅ DEBIT ACCOUNT ✅✅✅ (MISSING BEFORE)
    @PostMapping("/{id}/debit")
    public Account debit(
            @PathVariable Long id,
            @RequestParam BigDecimal amount) {

        return accountService.debit(id, amount);
    }
}