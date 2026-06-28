package com.infy.neobank.dto;

import java.time.LocalDateTime;

public class PendingApprovalDTO {

    private Long id;
    private String type;
    private Long userId;
    private Long loanProductId;
    private Double requestedAmount;
    private LocalDateTime appliedAt;

    public PendingApprovalDTO(Long id,
                              String type,
                              Long userId,
                              Long loanProductId,
                              Double requestedAmount,
                              LocalDateTime appliedAt) {

        this.id = id;
        this.type = type;
        this.userId = userId;
        this.loanProductId = loanProductId;
        this.requestedAmount = requestedAmount;
        this.appliedAt = appliedAt;
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public Long getUserId() { return userId; }
    public Long getLoanProductId() { return loanProductId; }
    public Double getRequestedAmount() { return requestedAmount; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
}
