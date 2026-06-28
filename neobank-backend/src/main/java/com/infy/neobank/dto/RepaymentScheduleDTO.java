package com.infy.neobank.dto;

import java.time.LocalDate;

import com.infy.neobank.entity.PaymentStatus;

public class RepaymentScheduleDTO {

    private Long id;
    private Integer installmentNumber;
    private Double emiAmount;
    private Double principalComponent;
    private Double interestComponent;
    private LocalDate dueDate;
    private PaymentStatus status;

    public RepaymentScheduleDTO() {}

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getInstallmentNumber() { return installmentNumber; }
    public void setInstallmentNumber(Integer installmentNumber) { this.installmentNumber = installmentNumber; }

    public Double getEmiAmount() { return emiAmount; }
    public void setEmiAmount(Double emiAmount) { this.emiAmount = emiAmount; }

    public Double getPrincipalComponent() { return principalComponent; }
    public void setPrincipalComponent(Double principalComponent) { this.principalComponent = principalComponent; }

    public Double getInterestComponent() { return interestComponent; }
    public void setInterestComponent(Double interestComponent) { this.interestComponent = interestComponent; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }
}
