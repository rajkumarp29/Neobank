package com.infy.neobank.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BudgetCategory category;

    @Column(name = "budget_month", nullable = false)
    private LocalDate budgetMonth;

    @Column(name = "limit_amount", nullable = false)
    private Double limitAmount;

    // ✅ FIX: Auto-populate created_at
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Budget() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public BudgetCategory getCategory() {
		return category;
	}

	public void setCategory(BudgetCategory category) {
		this.category = category;
	}

	public LocalDate getBudgetMonth() {
		return budgetMonth;
	}

	public void setBudgetMonth(LocalDate budgetMonth) {
		this.budgetMonth = budgetMonth;
	}

	public Double getLimitAmount() {
		return limitAmount;
	}

	public void setLimitAmount(Double limitAmount) {
		this.limitAmount = limitAmount;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
    

    // getters & setters ...
}