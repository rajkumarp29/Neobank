package com.infy.neobank.service;

import com.infy.neobank.dto.*;
import com.infy.neobank.repository.InsightsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.*;

@Service
@Transactional(readOnly = true)
public class InsightsService {

    @Autowired
    private InsightsRepository repository;

    public FinancialInsightsDTO buildInsights(Long userId) {

        BigDecimal income  = nvl(repository.getTotalIncome(userId));
        BigDecimal expense = nvl(repository.getTotalExpense(userId));
        BigDecimal savings = income.subtract(expense);
        long txCount       = repository.getTransactionCount(userId);

        List<CategorySpendDTO>  categories   = repository.getSpendingByCategory(userId);
        List<MonthlyTrendDTO>   monthlyTrend = buildMonthlyTrend(
                                    repository.getIncomeTrend(userId),
                                    repository.getExpenseTrend(userId));

        return new FinancialInsightsDTO(income, expense, savings, txCount, monthlyTrend, categories);
    }

    private BigDecimal nvl(BigDecimal v) { return v != null ? v : BigDecimal.ZERO; }

    private List<MonthlyTrendDTO> buildMonthlyTrend(
            List<TrendEntryDTO> incomeTrend, List<TrendEntryDTO> expenseTrend) {

        Map<String, BigDecimal> incMap = new HashMap<>();
        Map<String, BigDecimal> expMap = new HashMap<>();

        for (TrendEntryDTO t : incomeTrend)
            incMap.put(t.getYear() + "-" + t.getMonth(), t.getAmount());
        for (TrendEntryDTO t : expenseTrend)
            expMap.put(t.getYear() + "-" + t.getMonth(), t.getAmount());

        List<MonthlyTrendDTO> result = new ArrayList<>();
        YearMonth current = YearMonth.now();

        for (int i = 5; i >= 0; i--) {
            YearMonth ym  = current.minusMonths(i);
            String key    = ym.getYear() + "-" + ym.getMonthValue();
            BigDecimal inc = incMap.getOrDefault(key, BigDecimal.ZERO);
            BigDecimal exp = expMap.getOrDefault(key, BigDecimal.ZERO);

            if (inc.compareTo(BigDecimal.ZERO) > 0 || exp.compareTo(BigDecimal.ZERO) > 0) {
                String label = Month.of(ym.getMonthValue())
                        .getDisplayName(TextStyle.SHORT, Locale.ENGLISH) + " " + ym.getYear();
                result.add(new MonthlyTrendDTO(label, inc, exp));
            }
        }
        return result;
    }
}