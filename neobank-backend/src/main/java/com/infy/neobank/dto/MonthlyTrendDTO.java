package com.infy.neobank.dto;
import java.math.BigDecimal;

public class MonthlyTrendDTO {
    private String month;
    private BigDecimal income;
    private BigDecimal expense;

    public MonthlyTrendDTO(String month, BigDecimal income, BigDecimal expense) {
        this.month = month;
        this.income = income;
        this.expense = expense;
    }

    public String getMonth()       { return month; }
    public BigDecimal getIncome()  { return income; }
    public BigDecimal getExpense() { return expense; }
}