package com.infy.neobank.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infy.neobank.dto.BudgetRequestDTO;
import com.infy.neobank.dto.BudgetSummaryDTO;
import com.infy.neobank.service.BudgetService;
import com.infy.neobank.service.BudgetSummaryService;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;
    private final BudgetSummaryService budgetSummaryService;

    public BudgetController(
            BudgetService budgetService,
            BudgetSummaryService budgetSummaryService
    ) {
        this.budgetService = budgetService;
        this.budgetSummaryService = budgetSummaryService;
    }

    /**
     * ✅ CREATE BUDGET
     * POST /api/budgets
     * (Authenticated user via JWT)
     */
    @PostMapping
    public ResponseEntity<Void> createBudget(
            @RequestBody BudgetRequestDTO request
    ) {
        budgetService.createBudget(request);
        return ResponseEntity.ok().build();
    }

    /**
     * ✅ GET BUDGET SUMMARY
     * GET /api/budgets/{month}
     * Example: /api/budgets/2026-05
     */
    @GetMapping("/{month}")
    public ResponseEntity<BudgetSummaryDTO> getBudgetSummary(
            @PathVariable String month
    ) {
        return ResponseEntity.ok(
                budgetSummaryService.getBudgetSummary(month)
        );
    }
}