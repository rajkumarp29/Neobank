package com.infy.neobank.dto;

public class LoanApplicationRequestDTO {

    private Long loanProductId;
    private Double requestedAmount;
    private Integer requestedTenureMonths;

    public Long getLoanProductId() { return loanProductId; }
    public void setLoanProductId(Long loanProductId) { this.loanProductId = loanProductId; }

    public Double getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(Double requestedAmount) { this.requestedAmount = requestedAmount; }

    public Integer getRequestedTenureMonths() { return requestedTenureMonths; }
    public void setRequestedTenureMonths(Integer requestedTenureMonths) {
        this.requestedTenureMonths = requestedTenureMonths;
    }
}