package com.infy.neobank.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;


import jakarta.persistence.*;

@Entity
@Table(name = "loan_repayments")
public class LoanRepayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "loan_account_id")
    private Long loanAccountId;

    @Column(name = "instalment_number")
    private Integer instalmentNumber;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "emi_amount")
    private Double emiAmount;

    @Column(name = "principal_component")
    private Double principalComponent;

    @Column(name = "interest_component")
    private Double interestComponent;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    public LoanRepayment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getLoanAccountId() { return loanAccountId; }
    public void setLoanAccountId(Long loanAccountId) { this.loanAccountId = loanAccountId; }

    public Integer getInstalmentNumber() { return instalmentNumber; }
    public void setInstalmentNumber(Integer instalmentNumber) { this.instalmentNumber = instalmentNumber; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public Double getEmiAmount() { return emiAmount; }
    public void setEmiAmount(Double emiAmount) { this.emiAmount = emiAmount; }

    public Double getPrincipalComponent() { return principalComponent; }
    public void setPrincipalComponent(Double principalComponent) { this.principalComponent = principalComponent; }

    public Double getInterestComponent() { return interestComponent; }
    public void setInterestComponent(Double interestComponent) { this.interestComponent = interestComponent; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getPaidAt() { return paidAt; }
    public void setPaidAt(LocalDateTime paidAt) { this.paidAt = paidAt; }
}
