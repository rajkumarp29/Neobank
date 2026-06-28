package com.infy.neobank.dto;

import com.infy.neobank.entity.BudgetCategory;

public class BudgetRequestDTO {

    private BudgetCategory category;
    private String budgetMonth;    // YYYY-MM
    private Double limitAmount;

    // ✅ No-args constructor (required by Spring)
    public BudgetRequestDTO() {}

    // ✅ Getters & Setters
    public BudgetCategory getCategory() {
        return category;
    }

    public void setCategory(BudgetCategory category) {
        this.category = category;
    }

    public String getBudgetMonth() {
        return budgetMonth;
    }

    public void setBudgetMonth(String budgetMonth) {
        this.budgetMonth = budgetMonth;
    }

    public Double getLimitAmount() {
        return limitAmount;
    }

    public void setLimitAmount(Double limitAmount) {
        this.limitAmount = limitAmount;
    }
}