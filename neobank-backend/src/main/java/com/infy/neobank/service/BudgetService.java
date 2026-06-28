package com.infy.neobank.service;

import java.time.LocalDate;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.infy.neobank.dto.BudgetRequestDTO;
import com.infy.neobank.entity.Budget;
import com.infy.neobank.entity.User;
import com.infy.neobank.repository.BudgetRepository;
import com.infy.neobank.repository.UserRepository;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(
            BudgetRepository budgetRepository,
            UserRepository userRepository
    ) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    /**
     * ✅ Create Monthly Budget
     * - Resolves user from JWT
     * - Prevents duplicate budgets
     * - Saves budget
     */
    public void createBudget(BudgetRequestDTO request) {

        // ✅ Resolve authenticated user (email from JWT)
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + email)
                );

        LocalDate budgetMonth =
                LocalDate.parse(request.getBudgetMonth() + "-01");

        // ✅ DUPLICATE CHECK (VERY IMPORTANT)
        boolean alreadyExists =
                budgetRepository
                        .findByUser_IdAndCategoryAndBudgetMonth(
                                user.getId(),
                                request.getCategory(),
                                budgetMonth
                        )
                        .isPresent();

        if (alreadyExists) {
            throw new IllegalStateException(
                    "Budget already exists for this category and month"
            );
        }

        // ✅ Create & save budget
        Budget budget = new Budget();
        budget.setUser(user);
        budget.setCategory(request.getCategory());
        budget.setBudgetMonth(budgetMonth);
        budget.setLimitAmount(request.getLimitAmount());

        budgetRepository.save(budget);
    }
}