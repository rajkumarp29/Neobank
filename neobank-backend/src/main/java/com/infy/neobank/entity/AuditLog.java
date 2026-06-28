package com.infy.neobank.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long actingAdminId;
    private String action;
    private Long targetUserId;

    private LocalDateTime timestamp = LocalDateTime.now();

    // Getters & Setters
    public Long getId() { return id; }

    public Long getActingAdminId() { return actingAdminId; }

    public void setActingAdminId(Long actingAdminId) {
        this.actingAdminId = actingAdminId;
    }

    public String getAction() { return action; }

    public void setAction(String action) {
        this.action = action;
    }

    public Long getTargetUserId() { return targetUserId; }

    public void setTargetUserId(Long targetUserId) {
        this.targetUserId = targetUserId;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
}
