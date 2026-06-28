package com.infy.neobank.dto;

public class LoanAccountDTO {

    private Long id;

    private Long loanApplicationId;

    private Long userId;

    private Double principalAmount;

    private Double annualInterestRate;

    private Double emiAmount;

    private Integer tenureMonths;

    public LoanAccountDTO() {}

    public LoanAccountDTO(
            Long id,
            Long loanApplicationId,
            Long userId,
            Double principalAmount,
            Double annualInterestRate,
            Double emiAmount,
            Integer tenureMonths) {

        this.id = id;
        this.loanApplicationId = loanApplicationId;
        this.userId = userId;
        this.principalAmount = principalAmount;
        this.annualInterestRate = annualInterestRate;
        this.emiAmount = emiAmount;
        this.tenureMonths = tenureMonths;
    }

    // GETTERS

    public Long getId() {
        return id;
    }

    public Long getLoanApplicationId() {
        return loanApplicationId;
    }

    public Long getUserId() {
        return userId;
    }

    public Double getPrincipalAmount() {
        return principalAmount;
    }

    public Double getAnnualInterestRate() {
        return annualInterestRate;
    }

    public Double getEmiAmount() {
        return emiAmount;
    }

    public Integer getTenureMonths() {
        return tenureMonths;
    }

    // SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setLoanApplicationId(
            Long loanApplicationId) {

        this.loanApplicationId =
                loanApplicationId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setPrincipalAmount(
            Double principalAmount) {

        this.principalAmount =
                principalAmount;
    }

    public void setAnnualInterestRate(
            Double annualInterestRate) {

        this.annualInterestRate =
                annualInterestRate;
    }

    public void setEmiAmount(
            Double emiAmount) {

        this.emiAmount =
                emiAmount;
    }

    public void setTenureMonths(
            Integer tenureMonths) {

        this.tenureMonths =
                tenureMonths;
    }
}