package com.infy.neobank.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@Getter
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK → Account
    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id")
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false)
    private BigDecimal amount;

    // ✅ REQUIRED: Budget category mapping
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BudgetCategory category;

    private String description;

    @Column(name = "transaction_date", nullable = false, updatable = false)
    private LocalDateTime transactionDate;

    @Column(name = "balance_after", nullable = false, updatable = false)
    private BigDecimal balanceAfter;

    public Transaction(Account account,
                       TransactionType type,
                       BigDecimal amount,
                       BigDecimal balanceAfter,
                       BudgetCategory category,
                       String description) {

        this.account = account;
        this.type = type;
        this.amount = amount;
        this.balanceAfter = balanceAfter;
        this.category = category;
        this.description = description;
        this.transactionDate = LocalDateTime.now();
    }
}