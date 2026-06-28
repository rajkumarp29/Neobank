package com.infy.neobank.repository;

import com.infy.neobank.dto.TrendEntryDTO;
import com.infy.neobank.dto.CategorySpendDTO;
import com.infy.neobank.entity.Transaction;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface InsightsRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'CREDIT' AND t.account.user.id = :userId")
    BigDecimal getTotalIncome(Long userId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'DEBIT' AND t.account.user.id = :userId")
    BigDecimal getTotalExpense(Long userId);

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.account.user.id = :userId")
    long getTransactionCount(Long userId);

    @Query("""
        SELECT new com.infy.neobank.dto.CategorySpendDTO(t.category, SUM(t.amount))
        FROM Transaction t
        WHERE t.type = 'DEBIT' AND t.account.user.id = :userId
        GROUP BY t.category
        ORDER BY SUM(t.amount) DESC
    """)
    List<CategorySpendDTO> getSpendingByCategory(Long userId);

    @Query("""
        SELECT new com.infy.neobank.dto.TrendEntryDTO(
            YEAR(t.transactionDate), MONTH(t.transactionDate), SUM(t.amount))
        FROM Transaction t
        WHERE t.type = 'CREDIT' AND t.account.user.id = :userId
        GROUP BY YEAR(t.transactionDate), MONTH(t.transactionDate)
        ORDER BY YEAR(t.transactionDate), MONTH(t.transactionDate)
    """)
    List<TrendEntryDTO> getIncomeTrend(Long userId);

    @Query("""
        SELECT new com.infy.neobank.dto.TrendEntryDTO(
            YEAR(t.transactionDate), MONTH(t.transactionDate), SUM(t.amount))
        FROM Transaction t
        WHERE t.type = 'DEBIT' AND t.account.user.id = :userId
        GROUP BY YEAR(t.transactionDate), MONTH(t.transactionDate)
        ORDER BY YEAR(t.transactionDate), MONTH(t.transactionDate)
    """)
    List<TrendEntryDTO> getExpenseTrend(Long userId);
}