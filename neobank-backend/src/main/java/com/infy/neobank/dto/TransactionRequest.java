package com.infy.neobank.dto;

import java.math.BigDecimal;
import com.infy.neobank.entity.BudgetCategory;
import com.infy.neobank.entity.TransactionType;

public class TransactionRequest {

    private TransactionType type;
    private BigDecimal amount;
    private BudgetCategory category;   // ✅ ADD THIS
    private String description;

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BudgetCategory getCategory() {
        return category;
    }

    public void setCategory(BudgetCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
