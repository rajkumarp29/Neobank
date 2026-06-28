package com.infy.neobank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.neobank.entity.LoanApplication;
import com.infy.neobank.entity.LoanStatus;

public interface LoanApplicationRepository
        extends JpaRepository<LoanApplication, Long> {

    List<LoanApplication> findByStatus(
            LoanStatus status);

    long countByStatus(
            LoanStatus status);

    List<LoanApplication>
    findByStatusOrderByAppliedAtAsc(
            LoanStatus status);

    List<LoanApplication>
    findByUserId(
            Long userId);
}