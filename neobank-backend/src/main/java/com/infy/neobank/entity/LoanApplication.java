package com.infy.neobank.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "loan_product_id")
    private Long loanProductId;

    @Column(name = "requested_amount")
    private Double requestedAmount;

    @Column(name = "requested_tenure_months")
    private Integer requestedTenureMonths;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LoanStatus status = LoanStatus.PENDING;

    @Column(name = "admin_remarks")
    private String adminRemarks;

    @CreationTimestamp
    @Column(name = "applied_at", updatable = false)
    private LocalDateTime appliedAt;

    @Column(name = "decided_at")
    private LocalDateTime decidedAt;

    public LoanApplication() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getLoanProductId() { return loanProductId; }
    public void setLoanProductId(Long loanProductId) { this.loanProductId = loanProductId; }

    public Double getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(Double requestedAmount) { this.requestedAmount = requestedAmount; }

    public Integer getRequestedTenureMonths() { return requestedTenureMonths; }
    public void setRequestedTenureMonths(Integer requestedTenureMonths) { this.requestedTenureMonths = requestedTenureMonths; }

    public LoanStatus getStatus() { return status; }
    public void setStatus(LoanStatus status) { this.status = status; }

    public String getAdminRemarks() { return adminRemarks; }
    public void setAdminRemarks(String adminRemarks) { this.adminRemarks = adminRemarks; }

    public LocalDateTime getAppliedAt() { return appliedAt; }

    public LocalDateTime getDecidedAt() { return decidedAt; }
    public void setDecidedAt(LocalDateTime decidedAt) { this.decidedAt = decidedAt; }
}