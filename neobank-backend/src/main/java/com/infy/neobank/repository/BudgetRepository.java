package com.infy.neobank.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infy.neobank.entity.Budget;
import com.infy.neobank.entity.BudgetCategory;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    // ✅ Day‑12: Duplicate check (FIXED)
    Optional<Budget> findByUser_IdAndCategoryAndBudgetMonth(
            Long userId,
            BudgetCategory category,
            LocalDate budgetMonth
    );

    // ✅ Day‑13: Fetch all budgets for a user in a month (FIXED)
    List<Budget> findByUser_IdAndBudgetMonth(
            Long userId,
            LocalDate budgetMonth
    );
}