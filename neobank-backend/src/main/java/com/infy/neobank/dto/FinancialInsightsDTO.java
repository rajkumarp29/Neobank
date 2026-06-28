package com.infy.neobank.dto;
import java.math.BigDecimal;
import java.util.List;

public class FinancialInsightsDTO {

    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;          // ← renamed (was totalExpense)
    private BigDecimal savings;
    private long transactionCount;             // ← new
    private List<MonthlyTrendDTO> monthlyTrend;      // ← renamed + new type
    private List<CategorySpendDTO> spendingByCategory; // ← new

    public FinancialInsightsDTO(BigDecimal totalIncome, BigDecimal totalExpenses,
                                BigDecimal savings, long transactionCount,
                                List<MonthlyTrendDTO> monthlyTrend,
                                List<CategorySpendDTO> spendingByCategory) {
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.savings = savings;
        this.transactionCount = transactionCount;
        this.monthlyTrend = monthlyTrend;
        this.spendingByCategory = spendingByCategory;
    }

    public BigDecimal getTotalIncome()              { return totalIncome; }
    public BigDecimal getTotalExpenses()            { return totalExpenses; }
    public BigDecimal getSavings()                  { return savings; }
    public long getTransactionCount()               { return transactionCount; }
    public List<MonthlyTrendDTO> getMonthlyTrend()  { return monthlyTrend; }
    public List<CategorySpendDTO> getSpendingByCategory() { return spendingByCategory; }
}