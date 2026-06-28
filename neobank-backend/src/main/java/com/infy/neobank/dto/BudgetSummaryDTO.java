package com.infy.neobank.dto;

import java.util.List;

public class BudgetSummaryDTO {

    private String month;
    private List<CategorySummaryDTO> categories;

    public BudgetSummaryDTO(String month, List<CategorySummaryDTO> categories) {
        this.month = month;
        this.categories = categories;
    }

    public String getMonth() {
        return month;
    }

    public List<CategorySummaryDTO> getCategories() {
        return categories;
    }
}