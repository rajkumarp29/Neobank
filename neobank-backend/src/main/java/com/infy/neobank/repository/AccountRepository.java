package com.infy.neobank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.neobank.entity.Account;
import com.infy.neobank.entity.User;

public interface AccountRepository extends JpaRepository<Account, Long> {

	   // Get all accounts of a user
	   List<Account> findByUser(User user);

	   // Find account by account number
	   Optional<Account> findByAccountNumber(String accountNumber);
	}