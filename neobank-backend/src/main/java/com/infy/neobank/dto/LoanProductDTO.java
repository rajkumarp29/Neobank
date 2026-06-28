package com.infy.neobank.dto;

public class LoanProductDTO {

    private Long id;
    private String productName;

    // ✅ FIX ADDED
    private String loanType;

    private Double minAmount;
    private Double maxAmount;
    private Double annualInterestRate;
    private String allowedTenures;

    public LoanProductDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    // ✅ IMPORTANT
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
}
