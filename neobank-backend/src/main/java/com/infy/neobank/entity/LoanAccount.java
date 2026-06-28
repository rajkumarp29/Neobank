package com.infy.neobank.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;

@Entity
@Table(name = "loan_accounts")
public class LoanAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "loan_application_id", unique = true)
    private Long loanApplicationId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "principal_amount")
    private Double principalAmount;

    @Column(name = "annual_interest_rate")
    private Double annualInterestRate;

    @Column(name = "tenure_months")
    private Integer tenureMonths;

    @Column(name = "emi_amount")
    private Double emiAmount;

    @CreationTimestamp
    @Column(name = "disbursed_at", updatable = false)
    private LocalDateTime disbursedAt;

    public LoanAccount() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getLoanApplicationId() { return loanApplicationId; }
    public void setLoanApplicationId(Long loanApplicationId) { this.loanApplicationId = loanApplicationId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Double getPrincipalAmount() { return principalAmount; }
    public void setPrincipalAmount(Double principalAmount) { this.principalAmount = principalAmount; }

    public Double getAnnualInterestRate() { return annualInterestRate; }
    public void setAnnualInterestRate(Double annualInterestRate) { this.annualInterestRate = annualInterestRate; }

    public Integer getTenureMonths() { return tenureMonths; }
    public void setTenureMonths(Integer tenureMonths) { this.tenureMonths = tenureMonths; }

    public Double getEmiAmount() { return emiAmount; }
    public void setEmiAmount(Double emiAmount) { this.emiAmount = emiAmount; }

    public LocalDateTime getDisbursedAt() { return disbursedAt; }
}