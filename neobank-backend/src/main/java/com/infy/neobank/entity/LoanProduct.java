package com.infy.neobank.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_products")
public class LoanProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", nullable = false, unique = true)
    private String productName;

    // ✅ IMPORTANT ADDED
    @Column(name = "loan_type", nullable = false)
    private String loanType;

    @Column(name = "min_amount", nullable = false)
    private Double minAmount;

    @Column(name = "max_amount", nullable = false)
    private Double maxAmount;

    @Column(name = "annual_interest_rate", nullable = false)
    private Double annualInterestRate;

    @Column(name = "allowed_tenures", nullable = false)
    private String allowedTenures;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public LoanProduct() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    // ✅ GETTER + SETTER (IMPORTANT)
    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }

    public Double getMinAmount() { return minAmount; }
    public void setMinAmount(Double minAmount) { this.minAmount = minAmount; }

    public Double getMaxAmount() { return maxAmount; }
    public void setMaxAmount(Double maxAmount) { this.maxAmount = maxAmount; }

    public Double getAnnualInterestRate() { return annualInterestRate; }
    public void setAnnualInterestRate(Double annualInterestRate) { this.annualInterestRate = annualInterestRate; }

    public String getAllowedTenures() { return allowedTenures; }
    public void setAllowedTenures(String allowedTenures) { this.allowedTenures = allowedTenures; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
