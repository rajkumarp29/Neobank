package com.infy.neobank.dto;

import java.time.LocalDateTime;

public class LoanApprovalDTO {

    private Long id;
    private Long userId;
    private Double amount;
    private LocalDateTime appliedAt;

    public LoanApprovalDTO(Long id, Long userId, Double amount, LocalDateTime appliedAt) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.appliedAt = appliedAt;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Double getAmount() { return amount; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
}
