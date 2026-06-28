package com.infy.neobank.dto;
import java.math.BigDecimal;
import com.infy.neobank.entity.BudgetCategory;

public class CategorySpendDTO {
    private String category;
    private BigDecimal amount;

    public CategorySpendDTO(BudgetCategory category, BigDecimal amount) {
        this.category = category.name();
        this.amount = amount;
    }

    public String getCategory()    { return category; }
    public BigDecimal getAmount()  { return amount; }
}