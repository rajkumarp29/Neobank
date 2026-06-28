package com.infy.neobank.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.infy.neobank.entity.Account;
import com.infy.neobank.entity.AccountType;
import com.infy.neobank.entity.User;
import com.infy.neobank.repository.AccountRepository;
import com.infy.neobank.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {


private final AccountRepository accountRepository;
private final UserRepository userRepository;

// ==========================
// CREATE ACCOUNT
// ==========================
public Account createAccount(AccountType accountType) {

    User user = getAuthenticatedUser();

    Account account = Account.builder()
            .accountType(accountType)
            .balance(BigDecimal.ZERO)
            .user(user)
            .accountNumber(generateAccountNumber())
            .build();

    return accountRepository.save(account);
}

// ==========================
// GET ACCOUNTS
// ADMIN → ALL
// CUSTOMER → OWN
// ==========================
public List<Account> getMyAccounts() {

    User user = getAuthenticatedUser();

    if (user.getRole().name().equals("ADMIN")) {
        return accountRepository.findAll();
    }

    return accountRepository.findByUser(user);
}

// ==========================
// GET ACCOUNT BY ID
// ADMIN → ANY ACCOUNT
// CUSTOMER → OWN ONLY
// ==========================
public Account getAccountById(Long accountId) {

    User user = getAuthenticatedUser();

    Account account = accountRepository.findById(accountId)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Account not found"));

    // ADMIN ACCESS
    if (user.getRole().name().equals("ADMIN")) {
        return account;
    }

    // CUSTOMER ACCESS
    if (!account.getUser().getId().equals(user.getId())) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Access denied");
    }

    return account;
}

// ==========================
// CREDIT
// ==========================
public Account credit(Long accountId, BigDecimal amount) {

    if (amount.compareTo(BigDecimal.ZERO) <= 0) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Amount must be positive");
    }

    Account account = getAccountById(accountId);

    account.setBalance(
            account.getBalance().add(amount)
    );

    return accountRepository.save(account);
}

// ==========================
// DEBIT
// ==========================
public Account debit(Long accountId, BigDecimal amount) {

    if (amount.compareTo(BigDecimal.ZERO) <= 0) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Amount must be positive");
    }

    Account account = getAccountById(accountId);

    if (account.getBalance().compareTo(amount) < 0) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Insufficient balance");
    }

    account.setBalance(
            account.getBalance().subtract(amount)
    );

    return accountRepository.save(account);
}

// ==========================
// AUTH USER
// ==========================
private User getAuthenticatedUser() {

    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    return userRepository
            .findByEmailIgnoreCase(email)
            .orElseThrow(() ->
                    new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "User not found"));
}

// ==========================
// ACCOUNT NUMBER
// ==========================
private String generateAccountNumber() {

    return UUID.randomUUID()
            .toString()
            .replace("-", "")
            .substring(0, 12);
}


}
