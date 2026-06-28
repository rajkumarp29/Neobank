package com.infy.neobank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.neobank.entity.LoanAccount;

public interface LoanAccountRepository
        extends JpaRepository<LoanAccount, Long> {

    Optional<LoanAccount> findByLoanApplicationId(
            Long applicationId);

    List<LoanAccount> findByUserId(
            Long userId);

    Optional<LoanAccount> findByIdAndUserId(
            Long id,
            Long userId);
}