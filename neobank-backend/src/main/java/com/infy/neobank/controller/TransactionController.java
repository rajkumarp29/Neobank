package com.infy.neobank.controller;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.TransactionRequest;
import com.infy.neobank.entity.Transaction;
import com.infy.neobank.repository.UserRepository;
import com.infy.neobank.service.TransactionService;

@RestController
@RequestMapping("/api/accounts")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserRepository userRepository;

    public TransactionController(
            TransactionService transactionService,
            UserRepository userRepository) {
        this.transactionService = transactionService;
        this.userRepository = userRepository;
    }

    /**
     * ✅ GET /api/accounts/{id}/transactions
     * - Ownership validated
     * - Paginated
     * - Sorted by transactionDate DESC
     */
    @GetMapping("/{id}/transactions")
    public Page<Transaction> getTransactions(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Principal principal) {

        // ✅ JWT principal = email
        String email = principal.getName();

        // ✅ Resolve userId from email
        Long userId = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("transactionDate").descending()
        );

        return transactionService.getTransactions(id, userId, pageable);
    }

    /**
     * ✅ POST /api/accounts/{id}/transactions
     * Flow:
     * - validate ownership
     * - validate amount > 0
     * - overdraft check
     * - @Transactional balance update + insert transaction
     */
    @PostMapping("/{id}/transactions")
    public Transaction createTransaction(
            @PathVariable Long id,
            @RequestBody TransactionRequest request,
            Principal principal) {

        // ✅ JWT principal = email
        String email = principal.getName();

        // ✅ Resolve userId from DB
        Long userId = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        return transactionService.createTransaction(
        	    id,
        	    request.getType(),
        	    request.getAmount(),
        	    request.getCategory(),     // ✅ PASS CATEGORY
        	    request.getDescription(),
        	    userId
        	);

    }
}