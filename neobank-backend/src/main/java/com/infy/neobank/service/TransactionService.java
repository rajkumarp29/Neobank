package com.infy.neobank.service;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.AccessDeniedException;

import com.infy.neobank.entity.*;
import com.infy.neobank.repository.AccountRepository;
import com.infy.neobank.repository.TransactionRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final RewardService rewardService;

    public TransactionService(AccountRepository accountRepository,
                              TransactionRepository transactionRepository,
                              RewardService rewardService) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.rewardService = rewardService;
    }

    /**
     * ✅ Create transaction + reward logic
     */
    @Transactional
    public Transaction createTransaction(Long accountId,
                                         TransactionType type,
                                         BigDecimal amount,
                                         BudgetCategory category,
                                         String description,
                                         Long userId) {

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be > 0");
        }

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        if (!account.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Unauthorized");
        }

        BigDecimal newBalance;

        if (type == TransactionType.DEBIT) {
            if (account.getBalance().compareTo(amount) < 0) {
                throw new IllegalStateException("Insufficient balance");
            }
            newBalance = account.getBalance().subtract(amount);
        } else {
            newBalance = account.getBalance().add(amount);
        }

        account.setBalance(newBalance);

        Transaction transaction = new Transaction(
                account,
                type,
                amount,
                newBalance,
                category,
                description
        );

        Transaction saved = transactionRepository.save(transaction);

        // ✅ Reward on large transaction
        if (amount.compareTo(BigDecimal.valueOf(5000)) >= 0) {
            rewardService.addPoints(userId, 5);
        }

        return saved;
    }

    public Page<Transaction> getTransactions(Long accountId,
                                             Long userId,
                                             Pageable pageable) {

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Account not found"));

        if (!account.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Unauthorized");
        }

        return transactionRepository
                .findByAccountIdOrderByTransactionDateDesc(accountId, pageable);
    }
}