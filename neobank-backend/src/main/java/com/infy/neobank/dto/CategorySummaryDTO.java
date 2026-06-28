package com.infy.neobank.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

import com.infy.neobank.entity.BudgetCategory;

public class CategorySummaryDTO {

    private BudgetCategory category;
    private BigDecimal limitAmount;
    private BigDecimal spentAmount;
    private BigDecimal remainingAmount;
    private BigDecimal utilizationPercentage;


public CategorySummaryDTO(
        BudgetCategory category,
        BigDecimal limitAmount,
        BigDecimal spentAmount
) {
    this.category = category;
    this.limitAmount = limitAmount;
    this.spentAmount = spentAmount;
    this.remainingAmount = limitAmount.subtract(spentAmount);

    this.utilizationPercentage =
            limitAmount.compareTo(BigDecimal.ZERO) == 0
                    ? BigDecimal.ZERO
                    : spentAmount
                        .multiply(BigDecimal.valueOf(100))
                        .divide(limitAmount, 2, RoundingMode.HALF_UP);
}


    public BudgetCategory getCategory() {
        return category;
    }

    public BigDecimal getLimitAmount() {
        return limitAmount;
    }

    public BigDecimal getSpentAmount() {
        return spentAmount;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public BigDecimal getUtilizationPercentage() {
        return utilizationPercentage;
    }
}