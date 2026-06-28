package com.infy.neobank.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infy.neobank.dto.BudgetSummaryDTO;
import com.infy.neobank.dto.CategorySummaryDTO;
import com.infy.neobank.entity.Budget;
import com.infy.neobank.entity.BudgetCategory;
import com.infy.neobank.entity.Transaction;
import com.infy.neobank.entity.TransactionType;
import com.infy.neobank.entity.User;
import com.infy.neobank.repository.BudgetRepository;
import com.infy.neobank.repository.TransactionRepository;
import com.infy.neobank.repository.UserRepository;

@Service
public class BudgetSummaryService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public BudgetSummaryService(
            BudgetRepository budgetRepository,
            TransactionRepository transactionRepository,
            UserRepository userRepository
    ) {
        this.budgetRepository = budgetRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    /**
     * ✅ Day‑13 / Day‑14 Budget Summary Logic
     * - Resolves authenticated user
     * - Aggregates ONLY DEBIT transactions
     * - Uses explicit BudgetCategory from Transaction
     */
    @Transactional(readOnly = true)
    public BudgetSummaryDTO getBudgetSummary(String month) {

        // ✅ Validate month format YYYY-MM
        if (month == null || !month.matches("\\d{4}-\\d{2}")) {
            throw new IllegalArgumentException(
                    "Invalid month format. Expected YYYY-MM"
            );
        }

        // ✅ Resolve authenticated user
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + email)
                );

        Long userId = user.getId();

        // ✅ Month boundaries
        LocalDate firstDayOfMonth = LocalDate.parse(month + "-01");
        LocalDateTime startDate = firstDayOfMonth.atStartOfDay();
        LocalDateTime endDate = firstDayOfMonth.plusMonths(1).atStartOfDay();

        // ✅ Fetch budgets for this user & month
        List<Budget> budgets =
                budgetRepository.findByUser_IdAndBudgetMonth(
                        userId,
                        firstDayOfMonth
                );

        // ✅ Fetch all transactions for this user & month
        List<Transaction> transactions =
                transactionRepository.findByAccountUserIdAndTransactionDateBetween(
                        userId,
                        startDate,
                        endDate
                );

        // ✅ Aggregate spent amount per category (DEBIT only)
        Map<BudgetCategory, BigDecimal> spentByCategory = new HashMap<>();

        for (Transaction tx : transactions) {

            // ✅ Ignore credits (income)
            if (tx.getType() != TransactionType.DEBIT) {
                continue;
            }

            BudgetCategory category = tx.getCategory();

            BigDecimal currentSpent =
                    spentByCategory.getOrDefault(category, BigDecimal.ZERO);

            spentByCategory.put(
                    category,
                    currentSpent.add(tx.getAmount())
            );
        }

        // ✅ Build category summaries
        List<CategorySummaryDTO> categorySummaries = new ArrayList<>();

        for (Budget budget : budgets) {

            BigDecimal spent =
                    spentByCategory.getOrDefault(
                            budget.getCategory(),
                            BigDecimal.ZERO
                    );

            categorySummaries.add(
                    new CategorySummaryDTO(
                            budget.getCategory(),
                            BigDecimal.valueOf(budget.getLimitAmount()),
                            spent
                    )
            );
        }

        return new BudgetSummaryDTO(month, categorySummaries);
    }
}