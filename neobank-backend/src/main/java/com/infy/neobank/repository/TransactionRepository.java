package com.infy.neobank.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.infy.neobank.entity.Transaction;
import com.infy.neobank.entity.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // ✅ 1. PAGINATION (ACCOUNT LEVEL)
    Page<Transaction> findByAccountIdOrderByTransactionDateDesc(
            Long accountId,
            Pageable pageable
    );

    // ✅ 2. DATE RANGE (USED IN INSIGHTS)
    List<Transaction> findByAccountUserIdAndTransactionDateBetween(
            Long userId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    // ✅ 3. ADMIN ACTIVITY (TOP 20 TRANSACTIONS 🔥)
    @Query("""
        SELECT t FROM Transaction t
        WHERE t.account.user.id = :userId
        ORDER BY t.transactionDate DESC
    """)
    List<Transaction> findTop20ByUserId(
            @Param("userId") Long userId,
            Pageable pageable   // ✅ pass PageRequest.of(0,20)
    );

    // ✅ 4. TOTAL CREDITS (SYSTEM LEVEL)
    @Query("""
        SELECT SUM(t.amount)
        FROM Transaction t
        WHERE t.type = com.infy.neobank.entity.TransactionType.CREDIT
    """)
    Double getTotalCredits();

    // ✅ 5. TOTAL DEBITS (SYSTEM LEVEL)
    @Query("""
        SELECT SUM(t.amount)
        FROM Transaction t
        WHERE t.type = com.infy.neobank.entity.TransactionType.DEBIT
    """)
    Double getTotalDebits();

    // ✅ 6. USER TOTAL CREDIT (INSIGHTS 🔥)
    @Query("""
        SELECT SUM(t.amount)
        FROM Transaction t
        WHERE t.account.user.id = :userId
        AND t.type = :type
    """)
    Double getTotalByUserAndType(
            @Param("userId") Long userId,
            @Param("type") TransactionType type
    );

    // ✅ 7. CATEGORY-WISE SPENDING (INSIGHTS 🔥)
    @Query("""
        SELECT t.category, SUM(t.amount)
        FROM Transaction t
        WHERE t.account.user.id = :userId
        GROUP BY t.category
    """)
    List<Object[]> getCategoryTotals(@Param("userId") Long userId);

}
